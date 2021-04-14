"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Option_1 = require("fp-ts/lib/Option");
const pipeable_1 = require("fp-ts/lib/pipeable");
const lodash_1 = require("lodash");
const utils_1 = require("./utils");
exports.apiKeyInCookie = (input, name) => {
    const probablyCookie = lodash_1.get(input, ['headers', 'cookie']);
    const isApiKeyInCookie = pipeable_1.pipe(Option_1.fromNullable(probablyCookie), Option_1.map(cookie => new RegExp(`${name}=.+`).test(cookie)), Option_1.getOrElse(() => false));
    return utils_1.when(isApiKeyInCookie, undefined);
};
exports.apiKeyInHeader = (input, name) => {
    const isAPIKeyProvided = lodash_1.get(input, ['headers', name.toLowerCase()]);
    return utils_1.when(!!isAPIKeyProvided, undefined);
};
exports.apiKeyInQuery = (input, name) => {
    const isApiKeyInQuery = lodash_1.get(input, ['url', 'query', name]);
    return utils_1.when(isApiKeyInQuery, undefined);
};
