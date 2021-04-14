import { IHttpOperation } from '@stoplight/types';
export declare function getHttpOperationsFromResource(file: string): Promise<IHttpOperation[]>;
export default function getHttpOperations(specContent: string, baseUri?: string): Promise<IHttpOperation[]>;
