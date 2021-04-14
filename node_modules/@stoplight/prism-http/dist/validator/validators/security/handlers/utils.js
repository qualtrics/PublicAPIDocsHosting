"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("@stoplight/types");
const Either_1 = require("fp-ts/lib/Either");
function genRespForScheme(isSchemeProper, isCredsGiven, msg) {
    if (isSchemeProper) {
        return when(isCredsGiven, undefined);
    }
    return Either_1.left(exports.genUnauthorisedErr(msg));
}
exports.genRespForScheme = genRespForScheme;
exports.genUnauthorisedErr = (msg) => ({
    severity: types_1.DiagnosticSeverity.Error,
    message: 'Invalid security scheme used',
    code: 401,
    tags: msg ? [msg] : [],
});
function isScheme(shouldBeScheme, authScheme) {
    return authScheme.toLowerCase() === shouldBeScheme;
}
exports.isScheme = isScheme;
function when(condition, errorMessage) {
    return condition ? Either_1.right(true) : Either_1.left(exports.genUnauthorisedErr(errorMessage));
}
exports.when = when;
