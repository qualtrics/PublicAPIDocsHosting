"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pino = require("pino");
const lodash_1 = require("lodash");
function createLogger(name, overrideOptions = {}, destination) {
    const options = lodash_1.defaultsDeep(overrideOptions, {
        name,
        customLevels: {
            success: 12,
        },
        level: 'success',
        base: {},
        timestamp: false,
    });
    if (destination)
        return pino(options, destination);
    return pino(options);
}
exports.createLogger = createLogger;
