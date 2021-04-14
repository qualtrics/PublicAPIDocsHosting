"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const E = require("fp-ts/lib/Either");
const O = require("fp-ts/lib/Option");
const pipeable_1 = require("fp-ts/lib/pipeable");
const lodash_1 = require("lodash");
const fp_1 = require("lodash/fp");
const handlers_1 = require("./handlers");
const NonEmptyArray_1 = require("fp-ts/lib/NonEmptyArray");
const Array_1 = require("fp-ts/lib/Array");
const EitherValidation = E.getValidation(NonEmptyArray_1.getSemigroup());
const eitherSequence = Array_1.array.sequence(EitherValidation);
function getValidationResults(securitySchemes, input) {
    const [first, ...others] = getAuthenticationArray(securitySchemes, input);
    return others.reduce((prev, current) => EitherValidation.alt(prev, () => current), first);
}
function setErrorTag(authResults) {
    const tags = authResults.map(authResult => authResult.tags || []);
    return fp_1.set(['tags'], lodash_1.flatten(tags), authResults[0]);
}
function getAuthenticationArray(securitySchemes, input) {
    return securitySchemes.map(securitySchemePairs => {
        const authResults = securitySchemePairs.map(securityScheme => pipeable_1.pipe(handlers_1.findSecurityHandler(securityScheme), E.chain(securityHandler => securityHandler(input, 'name' in securityScheme ? securityScheme.name : '')), E.mapLeft(e => [e])));
        return eitherSequence(authResults);
    });
}
exports.validateSecurity = ({ element, resource }) => pipeable_1.pipe(O.fromNullable(resource.security), O.chain(O.fromPredicate(Array_1.isNonEmpty)), O.fold(() => E.right(element), securitySchemes => pipeable_1.pipe(getValidationResults(securitySchemes, element), E.bimap(e => [setErrorTag(e)], () => element))));
