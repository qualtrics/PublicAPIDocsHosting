"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("@stoplight/types");
const caseless = require("caseless");
const E = require("fp-ts/lib/Either");
const Record = require("fp-ts/lib/Record");
const pipeable_1 = require("fp-ts/lib/pipeable");
const A = require("fp-ts/lib/Array");
const R = require("fp-ts/lib/Reader");
const O = require("fp-ts/lib/Option");
const RE = require("fp-ts/lib/ReaderEither");
const Array_1 = require("fp-ts/lib/Array");
const Do_1 = require("fp-ts-contrib/lib/Do");
const lodash_1 = require("lodash");
const typeIs = require("type-is");
const types_2 = require("../types");
const withLogger_1 = require("../withLogger");
const errors_1 = require("./errors");
const JSONSchema_1 = require("./generator/JSONSchema");
const NegotiatorHelpers_1 = require("./negotiator/NegotiatorHelpers");
const callbacks_1 = require("./callback/callbacks");
const body_1 = require("../validator/validators/body");
const eitherRecordSequence = Record.sequence(E.either);
const mock = ({ resource, input, config, }) => {
    const payloadGenerator = config.dynamic ? JSONSchema_1.generate : JSONSchema_1.generateStatic;
    return pipeable_1.pipe(withLogger_1.default(logger => {
        const acceptMediaType = input.data.headers && caseless(input.data.headers).get('accept');
        if (!config.mediaTypes && acceptMediaType) {
            logger.info(`Request contains an accept header: ${acceptMediaType}`);
            config.mediaTypes = acceptMediaType.split(',');
        }
        return config;
    }), R.chain(mockConfig => negotiateResponse(mockConfig, input, resource)), R.chain(result => assembleResponse(result, payloadGenerator)), R.chain(response => logger => pipeable_1.pipe(response, E.map(response => runCallbacks({ resource, request: input.data, response })(logger)), E.chain(() => response))));
};
function runCallbacks({ resource, request, response, }) {
    return withLogger_1.default(logger => pipeable_1.pipe(O.fromNullable(resource.callbacks), O.map(callbacks => pipeable_1.pipe(callbacks, Array_1.map(callback => callbacks_1.runCallback({ callback, request: parseBodyIfUrlEncoded(request, resource), response })(logger)())))));
}
function parseBodyIfUrlEncoded(request, resource) {
    const mediaType = caseless(request.headers || {}).get('content-type');
    if (!mediaType)
        return request;
    if (!typeIs.is(mediaType, ['application/x-www-form-urlencoded']))
        return request;
    const specs = pipeable_1.pipe(O.fromNullable(resource.request), O.mapNullable(request => request.body), O.mapNullable(body => body.contents), O.getOrElse(() => []));
    const encodedUriParams = body_1.splitUriParams(request.body);
    if (specs.length < 1) {
        return Object.assign(request, { body: encodedUriParams });
    }
    const content = pipeable_1.pipe(O.fromNullable(mediaType), O.chain(mediaType => body_1.findContentByMediaTypeOrFirst(specs, mediaType)), O.map(({ content }) => content), O.getOrElse(() => specs[0] || {}));
    const encodings = lodash_1.get(content, 'encodings', []);
    if (!content.schema)
        return Object.assign(request, { body: encodedUriParams });
    return Object.assign(request, {
        body: body_1.deserializeFormBody(content.schema, encodings, body_1.decodeUriEntities(encodedUriParams)),
    });
}
function createInvalidInputResponse(failedValidations, responses) {
    const securityValidation = failedValidations.find(validation => validation.code === 401);
    return pipeable_1.pipe(withLogger_1.default(logger => logger.warn({ name: 'VALIDATOR' }, 'Request did not pass the validation rules')), R.chain(() => pipeable_1.pipe(NegotiatorHelpers_1.default.negotiateOptionsForInvalidRequest(responses, securityValidation ? ['401'] : ['422', '400']), RE.mapLeft(() => securityValidation
        ? exports.createUnauthorisedResponse(securityValidation.tags)
        : exports.createUnprocessableEntityResponse(failedValidations)))));
}
exports.createInvalidInputResponse = createInvalidInputResponse;
exports.createUnauthorisedResponse = (tags) => types_2.ProblemJsonError.fromTemplate(errors_1.UNAUTHORIZED, 'Your request does not fullfil the security requirements and no HTTP unauthorized response was found in the spec, so Prism is generating this error for you.', tags && tags.length ? { headers: { 'WWW-Authenticate': tags.join(',') } } : undefined);
exports.createUnprocessableEntityResponse = (validations) => types_2.ProblemJsonError.fromTemplate(errors_1.UNPROCESSABLE_ENTITY, 'Your request is not valid and no HTTP validation response was found in the spec, so Prism is generating this error for you.', {
    validation: validations.map(detail => ({
        location: detail.path,
        severity: types_1.DiagnosticSeverity[detail.severity],
        code: detail.code,
        message: detail.message,
    })),
});
function negotiateResponse(mockConfig, input, resource) {
    const { [types_1.DiagnosticSeverity.Error]: errors, [types_1.DiagnosticSeverity.Warning]: warnings } = lodash_1.groupBy(input.validations, validation => validation.severity);
    if (errors && A.isNonEmpty(input.validations)) {
        return createInvalidInputResponse(input.validations, resource.responses);
    }
    else {
        return pipeable_1.pipe(withLogger_1.default(logger => {
            warnings && warnings.forEach(warn => logger.warn({ name: 'VALIDATOR' }, warn.message));
            return logger.success({ name: 'VALIDATOR' }, 'The request passed the validation rules. Looking for the best response');
        }), R.chain(() => NegotiatorHelpers_1.default.negotiateOptionsForValidRequest(resource, mockConfig)));
    }
}
function assembleResponse(result, payloadGenerator) {
    return logger => Do_1.Do(E.either)
        .bind('negotiationResult', result)
        .sequenceSL(({ negotiationResult }) => ({
        mockedBody: computeBody(negotiationResult, payloadGenerator),
        mockedHeaders: computeMockedHeaders(negotiationResult.headers || [], payloadGenerator),
    }))
        .return(negotiationResult => {
        const response = {
            statusCode: parseInt(negotiationResult.negotiationResult.code),
            headers: {
                ...negotiationResult.mockedHeaders,
                ...(negotiationResult.negotiationResult.mediaType && {
                    'Content-type': negotiationResult.negotiationResult.mediaType,
                }),
            },
            body: negotiationResult.mockedBody,
        };
        logger.success(`Responding with the requested status code ${response.statusCode}`);
        return response;
    });
}
function isINodeExample(nodeExample) {
    return !!nodeExample && 'value' in nodeExample;
}
function computeMockedHeaders(headers, payloadGenerator) {
    return eitherRecordSequence(lodash_1.mapValues(lodash_1.keyBy(headers, h => h.name), header => {
        if (header.schema) {
            if (header.examples && header.examples.length > 0) {
                const example = header.examples[0];
                if (isINodeExample(example)) {
                    return E.right(example.value);
                }
            }
            else {
                return pipeable_1.pipe(payloadGenerator(header.schema), E.map(example => {
                    if (lodash_1.isNumber(example) || lodash_1.isString(example))
                        return example;
                    return null;
                }));
            }
        }
        return E.right(null);
    }));
}
function computeBody(negotiationResult, payloadGenerator) {
    if (isINodeExample(negotiationResult.bodyExample) && negotiationResult.bodyExample.value !== undefined) {
        return E.right(negotiationResult.bodyExample.value);
    }
    else if (negotiationResult.schema) {
        return payloadGenerator(negotiationResult.schema);
    }
    return E.right(undefined);
}
exports.default = mock;
