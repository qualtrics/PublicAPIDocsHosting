import { HttpParamStyles, IHttpPathParam } from '@stoplight/types';
import { IHttpNameValue } from '../../types';
import { IHttpParamDeserializerRegistry } from '../deserializers/types';
import { HttpParamsValidator } from './params';
export declare class HttpPathValidator extends HttpParamsValidator<IHttpNameValue> {
    constructor(registry: IHttpParamDeserializerRegistry<IHttpNameValue>, prefix: string, style?: HttpParamStyles);
    validate(target: IHttpNameValue, specs: IHttpPathParam[]): import("fp-ts/lib/Either").Either<import("fp-ts/lib/NonEmptyArray").NonEmptyArray<import("@stoplight/prism-core").IPrismDiagnostic>, import("@stoplight/types").Dictionary<string, string>>;
}
