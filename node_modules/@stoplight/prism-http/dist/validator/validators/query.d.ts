import { HttpParamStyles, IHttpQueryParam } from '@stoplight/types';
import { IHttpNameValues } from '../../types';
import { IHttpParamDeserializerRegistry } from '../deserializers/types';
import { HttpParamsValidator } from './params';
export declare class HttpQueryValidator extends HttpParamsValidator<IHttpNameValues> {
    constructor(registry: IHttpParamDeserializerRegistry<IHttpNameValues>, prefix: string, style?: HttpParamStyles);
    validate(target: IHttpNameValues, specs: IHttpQueryParam[]): import("fp-ts/lib/Either").Either<import("fp-ts/lib/NonEmptyArray").NonEmptyArray<import("@stoplight/prism-core").IPrismDiagnostic>, import("@stoplight/types").Dictionary<string | string[], string>>;
}
