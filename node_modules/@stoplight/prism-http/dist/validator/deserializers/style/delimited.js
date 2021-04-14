"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DelimitedStyleDeserializer {
    constructor(separator, styleName) {
        this.separator = separator;
        this.styleName = styleName;
    }
    supports(style) {
        return style === this.styleName;
    }
    deserialize(name, parameters, schema, explode) {
        const type = schema ? schema.type : undefined;
        const values = parameters[name];
        if (type === 'array') {
            return explode ? this.deserializeImplodeArray(values) : this.deserializeArray(values);
        }
        else {
            throw new Error('Space/pipe/comma.. delimited style is only applicable to array parameter');
        }
    }
    deserializeImplodeArray(value) {
        return Array.isArray(value) ? value : [value];
    }
    deserializeArray(value) {
        if (Array.isArray(value)) {
            value = value[value.length - 1];
        }
        return value ? value.split(this.separator) : '';
    }
}
exports.DelimitedStyleDeserializer = DelimitedStyleDeserializer;
