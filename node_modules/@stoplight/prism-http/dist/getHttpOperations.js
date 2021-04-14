"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_spec_1 = require("@stoplight/http-spec");
const json_ref_readers_1 = require("@stoplight/json-ref-readers");
const json_ref_resolver_1 = require("@stoplight/json-ref-resolver");
const yaml_1 = require("@stoplight/yaml");
const node_fetch_1 = require("node-fetch");
const fs = require("fs");
const lodash_1 = require("lodash");
const os_1 = require("os");
const path_1 = require("path");
const httpAndFileResolver = new json_ref_resolver_1.Resolver({
    resolvers: {
        https: { resolve: json_ref_readers_1.resolveHttp },
        http: { resolve: json_ref_readers_1.resolveHttp },
        file: { resolve: json_ref_readers_1.resolveFile },
    },
    parseResolveResult: opts => Promise.resolve({ ...opts, result: yaml_1.parse(opts.result) }),
});
async function getHttpOperationsFromResource(file) {
    const isRemote = /^https?:\/\//i.test(file);
    const fileContent = await (isRemote
        ? node_fetch_1.default(file).then(d => d.text())
        : fs.promises.readFile(file, { encoding: 'utf8' }));
    return getHttpOperations(fileContent, isRemote ? file : path_1.resolve(file));
}
exports.getHttpOperationsFromResource = getHttpOperationsFromResource;
async function getHttpOperations(specContent, baseUri) {
    const parsedContent = yaml_1.parse(specContent);
    const { result: resolvedContent, errors } = await httpAndFileResolver.resolve(parsedContent, { baseUri });
    if (errors.length) {
        const uniqueErrors = lodash_1.uniq(errors.map(error => error.message)).join(os_1.EOL);
        throw new Error(`There's been an error while trying to resolve external references in your document: ${uniqueErrors}`);
    }
    const transformOperations = detectTransformOperationsFn(parsedContent);
    if (!transformOperations)
        throw new Error('Unsupported document format');
    return transformOperations(resolvedContent);
}
exports.default = getHttpOperations;
function detectTransformOperationsFn(parsedContent) {
    if (isOpenAPI2(parsedContent))
        return http_spec_1.transformOas2Operations;
    if (isOpenAPI3(parsedContent))
        return http_spec_1.transformOas3Operations;
    if (isPostmanCollection(parsedContent))
        return http_spec_1.transformPostmanCollectionOperations;
}
function isOpenAPI2(document) {
    return lodash_1.get(document, 'swagger');
}
function isOpenAPI3(document) {
    return lodash_1.get(document, 'openapi');
}
function isPostmanCollection(document) {
    return Array.isArray(lodash_1.get(document, 'item')) && lodash_1.get(document, 'info.name');
}
