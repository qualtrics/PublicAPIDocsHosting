"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const E = require("fp-ts/lib/Either");
const A = require("fp-ts/lib/Array");
const lodash_1 = require("lodash");
const TE = require("fp-ts/lib/TaskEither");
const pipeable_1 = require("fp-ts/lib/pipeable");
const lodash_2 = require("lodash");
const NonEmptyArray_1 = require("fp-ts/lib/NonEmptyArray");
const types_1 = require("@stoplight/types");
const function_1 = require("fp-ts/lib/function");
const eitherSequence = A.array.sequence(E.getValidation(NonEmptyArray_1.getSemigroup()));
function isProxyConfig(p) {
    return !p.mock;
}
function createWarningOutput(output) {
    return {
        output,
        validations: {
            input: [
                {
                    message: 'Selected route not found',
                    severity: types_1.DiagnosticSeverity.Warning,
                },
            ],
            output: [],
        },
    };
}
function factory(defaultConfig, components) {
    const inputValidation = (resource, input, config) => {
        const validations = lodash_1.compact([
            config.checkSecurity ? components.validateSecurity({ resource, element: input }) : undefined,
            config.validateRequest ? components.validateInput({ resource, element: input }) : undefined,
        ]);
        return pipeable_1.pipe(eitherSequence(validations), E.fold(function_1.identity, () => []), validations => E.right({ resource, validations }));
    };
    const mockOrForward = (resource, data, config, validations) => {
        const produceOutput = isProxyConfig(config)
            ? components.forward({ validations: config.errors ? validations : [], data }, config.upstream.href)(components.logger.child({ name: 'PROXY' }))
            : TE.fromEither(components.mock({
                resource,
                input: { data, validations },
                config: config.mock,
            })(components.logger.child({ name: 'NEGOTIATOR' })));
        return pipeable_1.pipe(produceOutput, TE.map(output => ({ output, resource, validations })));
    };
    return {
        request: (input, resources, c) => {
            const config = lodash_2.defaults(c, defaultConfig);
            return pipeable_1.pipe(TE.fromEither(components.route({ resources, input })), TE.fold(error => {
                if (!config.errors && isProxyConfig(config)) {
                    return pipeable_1.pipe(components.forward({ data: input, validations: [] }, config.upstream.href)(components.logger.child({ name: 'PROXY' })), TE.map(createWarningOutput));
                }
                else
                    return TE.left(error);
            }, resource => pipeable_1.pipe(TE.fromEither(inputValidation(resource, input, config)), TE.chain(({ resource, validations }) => mockOrForward(resource, input, config, validations)), TE.map(({ output, resource, validations: inputValidations }) => {
                const outputValidations = config.validateResponse
                    ? pipeable_1.pipe(E.swap(components.validateOutput({ resource, element: output })), E.getOrElse(() => []))
                    : [];
                return {
                    output,
                    validations: {
                        input: inputValidations,
                        output: outputValidations,
                    },
                };
            }))));
        },
    };
}
exports.factory = factory;
