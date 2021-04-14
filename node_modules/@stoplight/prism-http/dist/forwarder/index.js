"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = require("node-fetch");
const pipeable_1 = require("fp-ts/lib/pipeable");
const NEA = require("fp-ts/lib/NonEmptyArray");
const E = require("fp-ts/lib/Either");
const TE = require("fp-ts/lib/TaskEither");
const lodash_1 = require("lodash");
const url_1 = require("url");
const path_1 = require("path");
const parseResponse_1 = require("../utils/parseResponse");
const resources_1 = require("./resources");
const mocker_1 = require("../mocker");
const { version: prismVersion } = require('../../package.json');
const forward = ({ data: input, validations }, baseUrl) => logger => pipeable_1.pipe(NEA.fromArray(validations), TE.fromOption(() => undefined), TE.map(failedValidations => {
    const securityValidation = failedValidations.find(validation => validation.code === 401);
    return securityValidation
        ? mocker_1.createUnauthorisedResponse(securityValidation.tags)
        : mocker_1.createUnprocessableEntityResponse(failedValidations);
}), TE.swap, TE.chain(() => TE.fromEither(serializeBody(input.body))), TE.chain(body => TE.tryCatch(async () => {
    const partialUrl = url_1.parse(baseUrl);
    const url = url_1.format({
        ...partialUrl,
        pathname: path_1.posix.join(partialUrl.pathname || '', input.url.path),
        query: input.url.query,
    });
    logger.info(`Forwarding "${input.method}" request to ${url}...`);
    return node_fetch_1.default(url, {
        body,
        method: input.method,
        headers: lodash_1.defaults(lodash_1.omit(input.headers, ['host']), {
            accept: 'application/json, text/plain, */*',
            'user-agent': `Prism/${prismVersion}`,
        }),
    });
}, E.toError)), TE.chain(parseResponse_1.parseResponse), TE.map(stripHopByHopHeaders));
exports.default = forward;
function serializeBody(body) {
    if (typeof body === 'string') {
        return E.right(body);
    }
    if (body)
        return E.stringifyJSON(body, E.toError);
    return E.right(undefined);
}
const stripHopByHopHeaders = (response) => {
    response.headers = lodash_1.omit(response.headers, resources_1.hopByHopHeaders);
    return response;
};
