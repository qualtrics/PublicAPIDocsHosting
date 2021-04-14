"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("@stoplight/types");
const registry_1 = require("./registry");
const style_1 = require("./style");
const label_1 = require("./style/label");
const matrix_1 = require("./style/matrix");
exports.header = new registry_1.HttpParamDeserializerRegistry([new style_1.SimpleStyleDeserializer()]);
exports.query = new registry_1.HttpParamDeserializerRegistry([
    new style_1.FormStyleDeserializer(),
    new style_1.DelimitedStyleDeserializer('%20', types_1.HttpParamStyles.SpaceDelimited),
    new style_1.DelimitedStyleDeserializer('|', types_1.HttpParamStyles.PipeDelimited),
    new style_1.DelimitedStyleDeserializer(',', types_1.HttpParamStyles.CommaDelimited),
    new style_1.DeepObjectStyleDeserializer(),
]);
exports.path = new registry_1.HttpParamDeserializerRegistry([
    new style_1.SimpleStyleDeserializer(),
    new label_1.LabelStyleDeserializer(),
    new matrix_1.MatrixStyleDeserializer(),
]);
exports.body = exports.query;
