import { HttpParamStyles } from '@stoplight/types';
import { IHttpNameValues, JSONSchema } from '../../../types';
import { IHttpQueryParamStyleDeserializer } from '../types';
export declare class DelimitedStyleDeserializer implements IHttpQueryParamStyleDeserializer {
    private readonly separator;
    private readonly styleName;
    constructor(separator: string, styleName: HttpParamStyles.PipeDelimited | HttpParamStyles.SpaceDelimited | HttpParamStyles.CommaDelimited);
    supports(style: HttpParamStyles): boolean;
    deserialize(name: string, parameters: IHttpNameValues, schema?: JSONSchema, explode?: boolean): string[] | "";
    private deserializeImplodeArray;
    private deserializeArray;
}
