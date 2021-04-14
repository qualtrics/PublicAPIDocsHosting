"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("@stoplight/types");
const NonEmptyArray_1 = require("fp-ts/lib/NonEmptyArray");
const Either_1 = require("fp-ts/lib/Either");
const O = require("fp-ts/lib/Option");
const Do_1 = require("fp-ts-contrib/lib/Do");
const pipeable_1 = require("fp-ts/lib/pipeable");
const Apply_1 = require("fp-ts/lib/Apply");
const AjvOAI = require("ajv-oai");
const ajv = new AjvOAI({ allErrors: true, messages: true, schemaId: 'auto' });
const ajvNoCoerce = new AjvOAI({ allErrors: true, messages: true, schemaId: 'auto', coerceTypes: false });
exports.convertAjvErrors = (errors, severity, prefix) => pipeable_1.pipe(errors, NonEmptyArray_1.map(error => {
    const allowedParameters = 'allowedValues' in error.params ? `: ${error.params.allowedValues.join(', ')}` : '';
    const errorPath = error.dataPath.split('.').slice(1);
    const path = prefix ? [prefix, ...errorPath] : errorPath;
    return {
        path,
        code: error.keyword || '',
        message: `${error.message || ''}${allowedParameters}`,
        severity,
    };
}));
exports.validateAgainstSchema = (value, schema, coerce, prefix) => {
    const ajvInstance = coerce ? ajv : ajvNoCoerce;
    return Do_1.Do(O.option)
        .bind('validateFn', O.tryCatch(() => ajvInstance.compile(schema)))
        .doL(({ validateFn }) => O.tryCatch(() => validateFn(value)))
        .bindL('errors', ({ validateFn }) => pipeable_1.pipe(O.fromNullable(validateFn.errors), O.chain(NonEmptyArray_1.fromArray)))
        .return(({ errors }) => exports.convertAjvErrors(errors, types_1.DiagnosticSeverity.Error, prefix));
};
exports.sequenceOption = Apply_1.sequenceT(O.option);
exports.sequenceValidation = Apply_1.sequenceT(Either_1.getValidation(NonEmptyArray_1.getSemigroup()));
