import { HttpParamStyles } from '@stoplight/types';
import { IHttpNameValues, JSONSchema } from '../../../types';
import { IHttpQueryParamStyleDeserializer } from '../types';
export declare class DeepObjectStyleDeserializer implements IHttpQueryParamStyleDeserializer {
    supports(style: HttpParamStyles): boolean;
    deserialize(name: string, parameters: IHttpNameValues, schema?: JSONSchema): any;
}
