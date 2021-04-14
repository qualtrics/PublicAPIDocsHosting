"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("@stoplight/types");
const utils_1 = require("./utils");
class MatrixStyleDeserializer {
    supports(style) {
        return style === types_1.HttpParamStyles.Matrix;
    }
    deserialize(name, parameters, schema, explode = false) {
        const type = schema ? schema.type : 'undefined';
        if (!parameters[name].startsWith(';')) {
            throw new Error('Matrix serialization style requires parameter to be prefixed with ";"');
        }
        const value = parameters[name].substr(1);
        if (type === 'array') {
            return explode ? this.deserializeImplodeArray(name, value) : this.deserializeArray(name, value);
        }
        else if (type === 'object') {
            return explode ? this.deserializeImplodeObject(value) : this.deserializeObject(name, value);
        }
        else {
            return this.deserializePrimitive(name, value);
        }
    }
    deserializePrimitive(name, value) {
        const prefix = name + '=';
        if (!value.startsWith(prefix)) {
            throw new Error('Matrix serialization style requires parameter to be prefixed with name');
        }
        return value.substr(prefix.length);
    }
    deserializeArray(name, value) {
        const raw = this.deserializePrimitive(name, value);
        return raw === '' ? [] : raw.split(',');
    }
    deserializeImplodeArray(name, value) {
        if (value === '') {
            return [];
        }
        return value.split(';').map(part => this.deserializePrimitive(name, part));
    }
    deserializeImplodeObject(value) {
        return value.split(';').reduce((result, pair) => {
            const [k, v] = pair.split('=');
            return { ...result, [k]: v };
        }, {});
    }
    deserializeObject(name, value) {
        return utils_1.createObjectFromKeyValList(this.deserializePrimitive(name, value).split(','));
    }
}
exports.MatrixStyleDeserializer = MatrixStyleDeserializer;
