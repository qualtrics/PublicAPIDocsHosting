import { IHttpOperationResponse } from '@stoplight/types';
import { Option } from 'fp-ts/lib/Option';
export declare function findOperationResponse(responseSpecs: IHttpOperationResponse[], statusCode: number): Option<IHttpOperationResponse>;
