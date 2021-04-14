"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const O = require("fp-ts/lib/Option");
const Do_1 = require("fp-ts-contrib/lib/Do");
const Array_1 = require("fp-ts/lib/Array");
const pipeable_1 = require("fp-ts/lib/pipeable");
const lodash_1 = require("lodash");
const json_1 = require("@stoplight/json");
const DoOption = Do_1.Do(O.option);
function resolveRuntimeExpressions(input, request, response) {
    return input.replace(/{(.+?)}/g, (_, expr) => pipeable_1.pipe(resolveRuntimeExpression(expr, request, response), O.getOrElse(() => '')));
}
exports.resolveRuntimeExpressions = resolveRuntimeExpressions;
function resolveRuntimeExpression(expr, request, response) {
    const parts = expr.split(/[.#]/);
    return pipeable_1.pipe(tryMethod(), O.alt(tryStatusCode), O.alt(() => pipeable_1.pipe(isPart(0, '$request'), O.chain(() => pipeable_1.pipe(tryRequestHeader(), O.alt(tryRequestQuery), O.alt(tryRequestBody))))), O.alt(() => pipeable_1.pipe(isPart(0, '$response'), O.chain(() => pipeable_1.pipe(tryResponseHeader(), O.alt(tryResponseBody))))));
    function isPart(idx, type) {
        return pipeable_1.pipe(Array_1.lookup(idx, parts), O.chain(O.fromPredicate(part => part === type)));
    }
    function tryMethod() {
        return pipeable_1.pipe(isPart(0, '$method'), O.map(() => String(request.method)));
    }
    function tryStatusCode() {
        return pipeable_1.pipe(isPart(0, '$statusCode'), O.map(() => String(response.statusCode)));
    }
    function tryRequestHeader() {
        return pipeable_1.pipe(isPart(1, 'header'), O.chain(() => Array_1.lookup(2, parts)), O.chain(part => pipeable_1.pipe(O.fromNullable(request.headers), O.mapNullable(headers => headers[part]))));
    }
    function tryRequestQuery() {
        return pipeable_1.pipe(DoOption.do(isPart(1, 'query'))
            .bind('query', O.fromNullable(request.url.query))
            .bind('part', Array_1.lookup(2, parts))
            .done(), O.chain(({ part, query }) => O.fromNullable(query[part])));
    }
    function tryRequestBody() {
        return pipeable_1.pipe(isPart(1, 'body'), O.chain(() => readBody(request.body)));
    }
    function tryResponseHeader() {
        return pipeable_1.pipe(isPart(1, 'header'), O.chain(() => Array_1.lookup(2, parts)), O.chain(part => pipeable_1.pipe(O.fromNullable(response.headers), O.mapNullable(headers => headers[part]))));
    }
    function tryResponseBody() {
        return pipeable_1.pipe(isPart(1, 'body'), O.chain(() => readBody(response.body)));
    }
    function readBody(body) {
        return pipeable_1.pipe(DoOption.bind('body', O.fromNullable(body))
            .bind('path', pipeable_1.pipe(Array_1.lookup(2, parts), O.chain(part => O.tryCatch(() => json_1.pointerToPath('#' + part)))))
            .done(), O.chain(({ body, path }) => O.fromNullable(lodash_1.get(body, path))));
    }
}
exports.resolveRuntimeExpression = resolveRuntimeExpression;
