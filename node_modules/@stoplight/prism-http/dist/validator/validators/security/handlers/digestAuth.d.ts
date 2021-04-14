import { IHttpRequest } from '../../../../types';
export declare const httpDigest: (input: Pick<IHttpRequest, "headers" | "url">) => import("fp-ts/lib/Either").Either<import("@stoplight/prism-core").IPrismDiagnostic, unknown>;
