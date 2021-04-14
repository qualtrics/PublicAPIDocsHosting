import { HttpParamStyles } from '@stoplight/types';
import { IHttpParamDeserializerRegistry, IHttpParamStyleDeserializer } from './types';
export declare class HttpParamDeserializerRegistry<Parameters> implements IHttpParamDeserializerRegistry<Parameters> {
    private deserializers;
    constructor(deserializers: Array<IHttpParamStyleDeserializer<Parameters>>);
    get(style: HttpParamStyles): IHttpParamStyleDeserializer<Parameters> | undefined;
}
