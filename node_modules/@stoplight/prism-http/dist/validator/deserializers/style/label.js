"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("@stoplight/types");
const utils_1 = require("./utils");
class LabelStyleDeserializer {
    supports(style) {
        return style === types_1.HttpParamStyles.Label;
    }
    deserialize(name, parameters, schema, explode = false) {
        const type = schema ? schema.type : 'undefined';
        if (!parameters[name].startsWith('.')) {
            throw new Error('Label serialization style requires parameter to be prefixed with "."');
        }
        const value = parameters[name].substr(1);
        if (type === 'array') {
            return this.deserializeArray(value, explode);
        }
        else if (type === 'object') {
            return explode ? this.deserializeImplodeObject(value) : this.deserializeObject(value);
        }
        else {
            return value;
        }
    }
    deserializeArray(value, explode) {
        return value === '' ? [] : value.split(explode ? '.' : ',');
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
exports.LabelStyleDeserializer = LabelStyleDeserializer;
