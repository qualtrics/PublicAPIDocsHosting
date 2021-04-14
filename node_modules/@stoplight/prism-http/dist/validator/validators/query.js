"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("@stoplight/types");
const params_1 = require("./params");
class HttpQueryValidator extends params_1.HttpParamsValidator {
    constructor(registry, prefix, style = types_1.HttpParamStyles.Form) {
        super(registry, prefix, style);
    }
    validate(target, specs) {
        return super.validate(target, specs);
    }
}
exports.HttpQueryValidator = HttpQueryValidator;
