import { JSONSchema } from '../../types';
import { Either } from 'fp-ts/lib/Either';
export declare function generate(source: JSONSchema): Either<Error, unknown>;
export declare function generateStatic(source: JSONSchema): Either<Error, unknown>;
