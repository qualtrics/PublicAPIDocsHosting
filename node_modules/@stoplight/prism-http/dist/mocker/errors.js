"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UNPROCESSABLE_ENTITY = {
    type: 'UNPROCESSABLE_ENTITY',
    title: 'Invalid request body payload',
    status: 422,
};
exports.NOT_ACCEPTABLE = {
    type: 'NOT_ACCEPTABLE',
    title: 'The server cannot produce a representation for your accept header',
    status: 406,
};
exports.NOT_FOUND = {
    type: 'NOT_FOUND',
    title: 'The server cannot find the requested content',
    status: 404,
};
exports.NO_SUCCESS_RESPONSE_DEFINED = {
    type: 'NO_SUCCESS_RESPONSE_DEFINED',
    title: 'No response in the range 200-299 defined',
    status: 500,
};
exports.UNAUTHORIZED = {
    type: 'UNAUTHORIZED',
    title: 'Invalid security scheme used',
    status: 401,
};
exports.VIOLATIONS = {
    type: 'VIOLATIONS',
    title: 'Request/Response not valid',
    status: 500,
};
