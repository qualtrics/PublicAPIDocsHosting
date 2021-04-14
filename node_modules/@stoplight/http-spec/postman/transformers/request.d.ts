import { IHttpOperationRequest } from '@stoplight/types';
import { Request } from 'postman-collection';
import { Required } from 'utility-types';
export declare function transformRequest(request: Request): Required<IHttpOperationRequest, 'headers' | 'query'>;
