"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("@stoplight/types");
const lodash_1 = require("lodash");
const E = require("fp-ts/lib/Either");
const O = require("fp-ts/lib/Option");
const NonEmptyArray_1 = require("fp-ts/lib/NonEmptyArray");
const pipeable_1 = require("fp-ts/lib/pipeable");
const utils_1 = require("./utils");
class HttpParamsValidator {
    constructor(_registry, _prefix, _style) {
        this._registry = _registry;
        this._prefix = _prefix;
        this._style = _style;
    }
    validate(target, specs) {
        const { _registry: registry, _prefix: prefix, _style: style } = this;
        const deprecatedWarnings = specs
            .filter(spec => spec.deprecated && target[spec.name])
            .map(spec => ({
            path: [prefix, spec.name],
            code: 'deprecated',
            message: `${lodash_1.upperFirst(prefix)} param ${spec.name} is deprecated`,
            severity: types_1.DiagnosticSeverity.Warning,
        }));
        return pipeable_1.pipe(createJsonSchemaFromParams(specs), O.map(schema => {
            const parameterValues = lodash_1.pickBy(lodash_1.mapValues(lodash_1.keyBy(specs, s => s.name.toLowerCase()), el => {
                const resolvedStyle = el.style || style;
                const deserializer = registry.get(resolvedStyle);
                if (deserializer)
                    return deserializer.deserialize(el.name.toLowerCase(), lodash_1.mapKeys(target, (_value, key) => key.toLowerCase()), schema.properties && schema.properties[el.name], el.explode || false);
                return undefined;
            }));
            return { parameterValues, schema };
        }), O.chain(({ parameterValues, schema }) => utils_1.validateAgainstSchema(parameterValues, schema, true, prefix)), O.map(schemaDiagnostic => schemaDiagnostic.concat(deprecatedWarnings)), O.chain(NonEmptyArray_1.fromArray), O.alt(() => NonEmptyArray_1.fromArray(deprecatedWarnings)), E.fromOption(() => target), E.swap);
    }
}
exports.HttpParamsValidator = HttpParamsValidator;
function createJsonSchemaFromParams(params) {
    return pipeable_1.pipe(NonEmptyArray_1.fromArray(params), O.map(params => ({
        type: 'object',
        properties: lodash_1.pickBy(lodash_1.mapValues(lodash_1.keyBy(params, p => p.name.toLowerCase()), 'schema')),
        required: lodash_1.compact(params.map(m => (m.required ? m.name.toLowerCase() : undefined))),
    })));
}
