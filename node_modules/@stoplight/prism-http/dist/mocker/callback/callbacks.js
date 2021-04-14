"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const runtimeExpression_1 = require("../../utils/runtimeExpression");
const node_fetch_1 = require("node-fetch");
const O = require("fp-ts/lib/Option");
const E = require("fp-ts/lib/Either");
const A = require("fp-ts/lib/Array");
const Do_1 = require("fp-ts-contrib/lib/Do");
const TE = require("fp-ts/lib/TaskEither");
const Array_1 = require("fp-ts/lib/Array");
const pipeable_1 = require("fp-ts/lib/pipeable");
const HttpParamGenerator_1 = require("../generator/HttpParamGenerator");
const validator_1 = require("../../validator");
const parseResponse_1 = require("../../utils/parseResponse");
const logger_1 = require("../../utils/logger");
const traverseOption = A.array.traverse(O.option);
const DoOption = Do_1.Do(O.option);
function runCallback({ callback, request, response, }) {
    return logger => {
        const { url, requestData } = assembleRequest({ resource: callback, request, response });
        const logViolation = logger_1.violationLogger(logger);
        logger.info({ name: 'CALLBACK' }, `${callback.callbackName}: Making request to ${url}...`);
        return pipeable_1.pipe(TE.tryCatch(() => node_fetch_1.default(url, requestData), E.toError), TE.chain(parseResponse_1.parseResponse), TE.mapLeft(error => logger.error({ name: 'CALLBACK' }, `${callback.callbackName}: Request failed: ${error.message}`)), TE.chain(element => {
            logger.info({ name: 'CALLBACK' }, `${callback.callbackName}: Request finished`);
            return pipeable_1.pipe(validator_1.validateOutput({ resource: callback, element }), E.mapLeft(violations => {
                pipeable_1.pipe(violations, A.map(logViolation));
            }), TE.fromEither);
        }));
    };
}
exports.runCallback = runCallback;
function assembleRequest({ resource, request, response, }) {
    const bodyAndMediaType = O.toUndefined(assembleBody(resource.request));
    return {
        url: runtimeExpression_1.resolveRuntimeExpressions(resource.path, request, response),
        requestData: {
            headers: O.toUndefined(assembleHeaders(resource.request, bodyAndMediaType && bodyAndMediaType.mediaType)),
            body: bodyAndMediaType && bodyAndMediaType.body,
            method: resource.method,
        },
    };
}
function assembleBody(request) {
    return pipeable_1.pipe(O.fromNullable(request), O.mapNullable(request => request.body), O.mapNullable(body => body.contents), O.chain(contents => DoOption.bind('content', Array_1.head(contents))
        .bindL('body', ({ content }) => HttpParamGenerator_1.generate(content))
        .done()), O.chain(({ body, content: { mediaType } }) => pipeable_1.pipe(E.stringifyJSON(body, () => undefined), E.map(body => ({ body, mediaType })), O.fromEither)));
}
function assembleHeaders(request, bodyMediaType) {
    return pipeable_1.pipe(O.fromNullable(request), O.mapNullable(request => request.headers), O.chain(params => traverseOption(params, param => DoOption.bind('value', HttpParamGenerator_1.generate(param)).return(({ value }) => [param.name, value]))), O.reduce(pipeable_1.pipe(O.fromNullable(bodyMediaType), O.map(mediaType => ({ 'content-type': mediaType }))), (mediaTypeHeader, headers) => ({ ...headers, ...mediaTypeHeader })));
}
