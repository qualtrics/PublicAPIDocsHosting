import { IPrismDiagnostic } from '@stoplight/prism-core';
import { Dictionary, IHttpEncoding, IMediaTypeContent } from '@stoplight/types';
import * as E from 'fp-ts/lib/Either';
import * as O from 'fp-ts/lib/Option';
import { JSONSchema } from '../../types';
import { IHttpValidator } from './types';
import * as NonEmptyArray from 'fp-ts/lib/NonEmptyArray';
export declare function deserializeFormBody(schema: JSONSchema, encodings: IHttpEncoding[], decodedUriParams: Dictionary<string>): Dictionary<string, string>;
export declare function splitUriParams(target: string): Dictionary<string, string>;
export declare function decodeUriEntities(target: Dictionary<string>): {};
export declare function findContentByMediaTypeOrFirst(specs: IMediaTypeContent[], mediaType: string): O.Option<{
    mediaType: string;
    content: IMediaTypeContent;
}>;
export declare class HttpBodyValidator implements IHttpValidator<any, IMediaTypeContent> {
    private prefix;
    constructor(prefix: string);
    validate(target: unknown, specs: IMediaTypeContent[], mediaType?: string): E.Either<NonEmptyArray.NonEmptyArray<IPrismDiagnostic>, unknown>;
}
