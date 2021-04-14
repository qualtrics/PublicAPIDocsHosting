"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("@stoplight/types");
const Array = require("fp-ts/lib/Array");
const E = require("fp-ts/lib/Either");
const O = require("fp-ts/lib/Option");
const pipeable_1 = require("fp-ts/lib/pipeable");
const lodash_1 = require("lodash");
const deserializers_1 = require("../deserializers");
const utils_1 = require("./utils");
const type_is_1 = require("type-is");
const NonEmptyArray = require("fp-ts/lib/NonEmptyArray");
function deserializeFormBody(schema, encodings, decodedUriParams) {
    if (!schema.properties) {
        return decodedUriParams;
    }
    return pipeable_1.pipe(Object.keys(schema.properties), Array.reduce({}, (deserialized, property) => {
        deserialized[property] = decodedUriParams[property];
        const encoding = encodings.find(enc => enc.property === property);
        if (encoding && encoding.style) {
            const deserializer = deserializers_1.body.get(encoding.style);
            if (deserializer && schema.properties) {
                const propertySchema = schema.properties[property];
                deserialized[property] = deserializer.deserialize(property, decodedUriParams, propertySchema);
            }
        }
        return deserialized;
    }));
}
exports.deserializeFormBody = deserializeFormBody;
function splitUriParams(target) {
    return target.split('&').reduce((result, pair) => {
        const [key, ...rest] = pair.split('=');
        result[key] = rest.join('=');
        return result;
    }, {});
}
exports.splitUriParams = splitUriParams;
function decodeUriEntities(target) {
    return Object.entries(target).reduce((result, [k, v]) => {
        result[decodeURIComponent(k)] = decodeURIComponent(v);
        return result;
    }, {});
}
exports.decodeUriEntities = decodeUriEntities;
function findContentByMediaTypeOrFirst(specs, mediaType) {
    return pipeable_1.pipe(specs, Array.findFirst(spec => !!type_is_1.is(mediaType, [spec.mediaType])), O.alt(() => Array.head(specs)), O.map(content => ({ mediaType, content })));
}
exports.findContentByMediaTypeOrFirst = findContentByMediaTypeOrFirst;
function deserializeAndValidate(content, schema, target) {
    const encodings = lodash_1.get(content, 'encodings', []);
    const encodedUriParams = splitUriParams(target);
    return pipeable_1.pipe(validateAgainstReservedCharacters(encodedUriParams, encodings), E.map(decodeUriEntities), E.map(decodedUriEntities => deserializeFormBody(schema, encodings, decodedUriEntities)), E.chain(deserialised => pipeable_1.pipe(utils_1.validateAgainstSchema(deserialised, schema, true), E.fromOption(() => deserialised), E.swap)));
}
class HttpBodyValidator {
    constructor(prefix) {
        this.prefix = prefix;
    }
    validate(target, specs, mediaType) {
        const findContentByMediaType = pipeable_1.pipe(O.fromNullable(mediaType), O.chain(mt => findContentByMediaTypeOrFirst(specs, mt)), O.alt(() => O.some({ content: specs[0] || {}, mediaType: 'random' })), O.chain(({ mediaType, content }) => pipeable_1.pipe(O.fromNullable(content.schema), O.map(schema => ({ schema, mediaType, content })))));
        return pipeable_1.pipe(findContentByMediaType, O.fold(() => E.right(target), ({ content, mediaType: mt, schema }) => pipeable_1.pipe(mt, O.fromPredicate(mediaType => !!type_is_1.is(mediaType, ['application/x-www-form-urlencoded'])), O.fold(() => pipeable_1.pipe(utils_1.validateAgainstSchema(target, schema, false), E.fromOption(() => target), E.swap), () => pipeable_1.pipe(target, E.fromPredicate((target) => typeof target === 'string', () => [{ message: 'Target is not a string', code: '422', severity: types_1.DiagnosticSeverity.Error }]), E.chain(target => deserializeAndValidate(content, schema, target)))), E.mapLeft(diagnostics => applyPrefix(this.prefix, diagnostics)))));
    }
}
exports.HttpBodyValidator = HttpBodyValidator;
function applyPrefix(prefix, diagnostics) {
    return pipeable_1.pipe(diagnostics, NonEmptyArray.map(d => ({ ...d, path: [prefix, ...(d.path || [])] })));
}
function validateAgainstReservedCharacters(encodedUriParams, encodings) {
    return pipeable_1.pipe(encodings, Array.reduce([], (diagnostics, encoding) => {
        const allowReserved = lodash_1.get(encoding, 'allowReserved', false);
        const property = encoding.property;
        const value = encodedUriParams[property];
        if (!allowReserved && typeof value === 'string' && /[/?#[\]@!$&'()*+,;=]/.test(value)) {
            diagnostics.push({
                path: [property],
                message: 'Reserved characters used in request body',
                severity: types_1.DiagnosticSeverity.Error,
            });
        }
        return diagnostics;
    }), diagnostics => (Array.isNonEmpty(diagnostics) ? E.left(diagnostics) : E.right(encodedUriParams)));
}
