import { Response } from 'node-fetch';
import * as TE from 'fp-ts/lib/TaskEither';
import { Dictionary } from '@stoplight/types';
import { IHttpResponse } from '../types';
export declare const parseResponseBody: (response: Pick<Response, "json" | "headers" | "text">) => TE.TaskEither<Error, unknown>;
export declare const parseResponseHeaders: (headers: Dictionary<string[], string>) => Dictionary<string, string>;
export declare const parseResponse: (response: Pick<Response, "json" | "headers" | "status" | "text">) => TE.TaskEither<Error, IHttpResponse>;
