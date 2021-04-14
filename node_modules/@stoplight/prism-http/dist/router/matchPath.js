"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const E = require("fp-ts/lib/Either");
function fragmentarize(path) {
    return path.split('/').slice(1);
}
function getTemplateParamName(pathFragment) {
    const match = /{(.*)}/.exec(pathFragment);
    return match && match[1];
}
function matchPath(requestPath, operationPath) {
    if (!operationPath.startsWith('/')) {
        return E.left(new Error(`Given request path '${requestPath}' the operation path '${operationPath}' must start with a slash.`));
    }
    const operationPathFragments = fragmentarize(operationPath);
    const requestPathFragments = fragmentarize(requestPath);
    if (operationPathFragments.length < requestPathFragments.length ||
        operationPathFragments.length > requestPathFragments.length) {
        return E.right(types_1.MatchType.NOMATCH);
    }
    const params = [];
    while (requestPathFragments.length) {
        const requestPathFragment = requestPathFragments.shift();
        const operationPathFragment = operationPathFragments.shift();
        const paramName = getTemplateParamName(operationPathFragment);
        if (paramName === null && operationPathFragment !== requestPathFragment) {
            return E.right(types_1.MatchType.NOMATCH);
        }
        else if (paramName !== null) {
            params.push({
                name: paramName,
                value: requestPathFragment,
            });
        }
    }
    return E.right(params.length ? types_1.MatchType.TEMPLATED : types_1.MatchType.CONCRETE);
}
exports.matchPath = matchPath;
