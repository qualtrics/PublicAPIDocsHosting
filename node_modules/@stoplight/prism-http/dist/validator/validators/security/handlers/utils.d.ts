import { Either } from 'fp-ts/lib/Either';
import { IPrismDiagnostic } from '@stoplight/prism-core';
import { IHttpRequest } from '../../../../types';
export declare type ValidateSecurityFn = (input: Pick<IHttpRequest, 'headers' | 'url'>, name: string) => Either<IPrismDiagnostic, unknown>;
export declare function genRespForScheme(isSchemeProper: boolean, isCredsGiven: boolean, msg: string): Either<IPrismDiagnostic, unknown>;
export declare const genUnauthorisedErr: (msg?: string | undefined) => IPrismDiagnostic;
export declare function isScheme(shouldBeScheme: string, authScheme: string): boolean;
export declare function when(condition: boolean, errorMessage: string | undefined): Either<IPrismDiagnostic, unknown>;
