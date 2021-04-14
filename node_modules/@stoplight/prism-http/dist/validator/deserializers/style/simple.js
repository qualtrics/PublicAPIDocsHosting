"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("@stoplight/types");
const utils_1 = require("./utils");
class SimpleStyleDeserializer {
    supports(style) {
        return style === types_1.HttpParamStyles.Simple;
    }
    deserialize(name, parameters, schema, explode) {
        const type = schema ? schema.type : 'undefined';
        const value = parameters[name];
        if (type === 'array') {
            return this.deserializeArray(value);
        }
        else if (type === 'object') {
            return explode ? this.deserializeImplodeObject(value) : this.deserializeObject(value);
        }
        else {
            return value;
        }
    }
    deserializeArray(value) {
        return value === '' ? [] : value.split(',');
    }
    deserializeImplodeObject(value) {
        return value.split(',').reduce((result, pair) => {
            const [k, v] = pair.split('=');
            return { ...result, [k]: v };
        }, {});
    }
    deserializeObject(value) {
        return utils_1.createObjectFromKeyValList(value.split(','));
    }
}
exports.SimpleStyleDeserializer = SimpleStyleDeserializer;
