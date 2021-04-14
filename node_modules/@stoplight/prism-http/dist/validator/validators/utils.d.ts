import { IPrismDiagnostic } from '@stoplight/prism-core';
import { DiagnosticSeverity } from '@stoplight/types';
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray';
import * as O from 'fp-ts/lib/Option';
import type { ErrorObject } from 'ajv';
export declare const convertAjvErrors: (errors: NonEmptyArray<ErrorObject>, severity: DiagnosticSeverity, prefix?: string | undefined) => NonEmptyArray<IPrismDiagnostic>;
export declare const validateAgainstSchema: (value: unknown, schema: import("json-schema").JSONSchema4 | import("json-schema").JSONSchema6 | import("json-schema").JSONSchema7, coerce: boolean, prefix?: string | undefined) => O.Option<NonEmptyArray<IPrismDiagnostic>>;
export declare const sequenceOption: <T extends O.Option<any>[]>(...t: T & {
    readonly 0: O.Option<any>;
}) => O.Option<{ [K in keyof T]: [T[K]] extends [O.Option<infer A>] ? A : never; }>;
export declare const sequenceValidation: <T extends import("fp-ts/lib/Either").Either<NonEmptyArray<IPrismDiagnostic>, any>[]>(...t: T & {
    readonly 0: import("fp-ts/lib/Either").Either<NonEmptyArray<IPrismDiagnostic>, any>;
}) => import("fp-ts/lib/Either").Either<NonEmptyArray<IPrismDiagnostic>, { [K in keyof T]: [T[K]] extends [import("fp-ts/lib/Either").Either<NonEmptyArray<IPrismDiagnostic>, infer A>] ? A : never; }>;
