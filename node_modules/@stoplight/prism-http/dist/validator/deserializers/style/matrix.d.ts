import { HttpParamStyles } from '@stoplight/types';
import { IHttpNameValue, JSONSchema } from '../../../types';
import { IHttpHeaderParamStyleDeserializer } from '../types';
export declare class MatrixStyleDeserializer implements IHttpHeaderParamStyleDeserializer {
    supports(style: HttpParamStyles): boolean;
    deserialize(name: string, parameters: IHttpNameValue, schema?: JSONSchema, explode?: boolean): unknown;
    private deserializePrimitive;
    private deserializeArray;
    private deserializeImplodeArray;
    private deserializeImplodeObject;
    private deserializeObject;
}
