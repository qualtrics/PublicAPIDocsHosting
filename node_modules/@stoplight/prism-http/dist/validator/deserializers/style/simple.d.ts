import { HttpParamStyles } from '@stoplight/types';
import { IHttpNameValue, JSONSchema } from '../../../types';
import { IHttpHeaderParamStyleDeserializer } from '../types';
export declare class SimpleStyleDeserializer implements IHttpHeaderParamStyleDeserializer {
    supports(style: HttpParamStyles): boolean;
    deserialize(name: string, parameters: IHttpNameValue, schema?: JSONSchema, explode?: boolean): unknown;
    private deserializeArray;
    private deserializeImplodeObject;
    private deserializeObject;
}
