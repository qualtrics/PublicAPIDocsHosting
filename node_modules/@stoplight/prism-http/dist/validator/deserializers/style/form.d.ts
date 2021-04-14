import { HttpParamStyles } from '@stoplight/types';
import { IHttpNameValues, JSONSchema } from '../../../types';
import { IHttpQueryParamStyleDeserializer } from '../types';
export declare class FormStyleDeserializer implements IHttpQueryParamStyleDeserializer {
    supports(style: HttpParamStyles): boolean;
    deserialize(name: string, parameters: IHttpNameValues, schema?: JSONSchema, explode?: boolean): string | string[] | import("@stoplight/types").Dictionary<unknown, string> | undefined;
    private deserializeImplodeArray;
    private deserializeArray;
    private deserializeImplodeObject;
    private deserializeObject;
}
