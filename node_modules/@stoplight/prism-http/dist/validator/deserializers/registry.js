"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpParamDeserializerRegistry {
    constructor(deserializers) {
        this.deserializers = deserializers;
    }
    get(style) {
        const deserializer = this.deserializers.find(d => d.supports(style));
        if (!deserializer) {
            return;
        }
        return deserializer;
    }
}
exports.HttpParamDeserializerRegistry = HttpParamDeserializerRegistry;
