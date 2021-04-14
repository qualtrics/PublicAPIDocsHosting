"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("@stoplight/types");
const utils_1 = require("./utils");
class FormStyleDeserializer {
    supports(style) {
        return style === types_1.HttpParamStyles.Form;
    }
    deserialize(name, parameters, schema, explode = true) {
        const type = schema ? schema.type : undefined;
        const values = parameters[name];
        if (!values)
            return undefined;
        if (type === 'array') {
            return explode ? this.deserializeImplodeArray(values) : this.deserializeArray(values);
        }
        else if (type === 'object') {
            return explode ? this.deserializeImplodeObject(parameters, schema || {}) : this.deserializeObject(values);
        }
        else {
            return values;
        }
    }
    deserializeImplodeArray(value) {
        return Array.isArray(value) ? value : [value];
    }
    deserializeArray(value) {
        if (Array.isArray(value)) {
            value = value[value.length - 1];
        }
        return value.split(',');
    }
    deserializeImplodeObject(parameters, schema) {
        const properties = schema.properties || {};
        return Object.keys(parameters).reduce((result, key) => {
            const value = parameters[key];
            if (!Object.prototype.hasOwnProperty.call(properties, key)) {
                return result;
            }
            return { ...result, [key]: value };
        }, {});
    }
    deserializeObject(value) {
        if (Array.isArray(value)) {
            value = value[value.length - 1];
        }
        return utils_1.createObjectFromKeyValList(value.split(','));
    }
}
exports.FormStyleDeserializer = FormStyleDeserializer;
