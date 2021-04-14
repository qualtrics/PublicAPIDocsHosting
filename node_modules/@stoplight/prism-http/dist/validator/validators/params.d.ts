import { HttpParamStyles, IHttpParam } from '@stoplight/types';
import * as E from 'fp-ts/lib/Either';
import { IHttpParamDeserializerRegistry } from '../deserializers/types';
import { IHttpValidator } from './types';
import { IPrismDiagnostic } from '@stoplight/prism-core';
export declare class HttpParamsValidator<Target> implements IHttpValidator<Target, IHttpParam> {
    private _registry;
    private _prefix;
    private _style;
    constructor(_registry: IHttpParamDeserializerRegistry<Target>, _prefix: string, _style: HttpParamStyles);
    validate(target: Target, specs: IHttpParam[]): E.Either<import("fp-ts/lib/NonEmptyArray").NonEmptyArray<IPrismDiagnostic>, Target>;
}
