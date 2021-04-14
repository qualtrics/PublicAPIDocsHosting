"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const prism_core_1 = require("@stoplight/prism-core");
const lodash_1 = require("lodash");
const forwarder_1 = require("./forwarder");
const mocker_1 = require("./mocker");
const router_1 = require("./router");
const validator_1 = require("./validator");
tslib_1.__exportStar(require("./types"), exports);
tslib_1.__exportStar(require("./getHttpOperations"), exports);
tslib_1.__exportStar(require("./mocker/errors"), exports);
tslib_1.__exportStar(require("./router/errors"), exports);
tslib_1.__exportStar(require("./mocker/serializer/style"), exports);
var HttpParamGenerator_1 = require("./mocker/generator/HttpParamGenerator");
exports.generateHttpParam = HttpParamGenerator_1.generate;
exports.createInstance = (defaultConfig, components) => prism_core_1.factory(defaultConfig, lodash_1.defaults(components, {
    route: router_1.default,
    validateInput: validator_1.validateInput,
    validateOutput: validator_1.validateOutput,
    validateSecurity: validator_1.validateSecurity,
    mock: mocker_1.default,
    forward: forwarder_1.default,
}));
