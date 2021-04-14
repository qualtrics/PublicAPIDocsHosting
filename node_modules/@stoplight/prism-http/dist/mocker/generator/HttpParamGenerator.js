"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const O = require("fp-ts/lib/Option");
const pipeable_1 = require("fp-ts/lib/pipeable");
const JSONSchema_1 = require("./JSONSchema");
function improveSchema(schema) {
    const newSchema = { ...schema };
    if (newSchema.type === 'integer' || newSchema.type === 'number') {
        if (!newSchema.minimum) {
            newSchema.minimum = 1;
        }
        if (!newSchema.maximum) {
            newSchema.maximum = 1000;
        }
    }
    if (newSchema.type === 'string') {
        if (!newSchema.format && !newSchema.enum && !newSchema.pattern) {
            newSchema['x-faker'] = 'lorem.word';
        }
    }
    if (newSchema.type === 'object') {
        if (newSchema.properties) {
            newSchema.properties = Object.entries(newSchema.properties).reduce((r, [k, v]) => {
                r[k] = improveSchema(v);
                return r;
            }, {});
        }
    }
    if (newSchema.type === 'array') {
        if (typeof newSchema.items === 'object') {
            newSchema.items = improveSchema(newSchema.items);
        }
    }
    return newSchema;
}
exports.improveSchema = improveSchema;
function pickStaticExample(examples) {
    return pipeable_1.pipe(examples, O.mapNullable(exs => exs[Math.floor(Math.random() * exs.length)]), O.mapNullable(example => example.value));
}
function generate(param) {
    return pipeable_1.pipe(O.fromNullable(param.examples), pickStaticExample, O.alt(() => pipeable_1.pipe(O.fromNullable(param.schema), O.map(improveSchema), O.chain(schema => O.fromEither(JSONSchema_1.generate(schema))))));
}
exports.generate = generate;
