"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const type_is_1 = require("type-is");
const E = require("fp-ts/lib/Either");
const TE = require("fp-ts/lib/TaskEither");
const lodash_1 = require("lodash");
const pipeable_1 = require("fp-ts/lib/pipeable");
exports.parseResponseBody = (response) => TE.tryCatch(() => type_is_1.is(response.headers.get('content-type') || '', ['application/json', 'application/*+json'])
    ? response.json()
    : response.text(), E.toError);
exports.parseResponseHeaders = (headers) => lodash_1.mapValues(headers, hValue => hValue.join(' '));
exports.parseResponse = (response) => pipeable_1.pipe(exports.parseResponseBody(response), TE.map(body => ({
    statusCode: response.status,
    headers: exports.parseResponseHeaders(response.headers.raw()),
    body,
})));
