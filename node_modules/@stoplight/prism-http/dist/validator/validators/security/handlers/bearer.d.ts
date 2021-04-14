import { IHttpRequest } from '../../../../types';
export declare const bearer: (input: Pick<IHttpRequest, "headers" | "url">) => import("fp-ts/lib/Either").Either<import("@stoplight/prism-core").IPrismDiagnostic, unknown>;
export declare const oauth2: (input: Pick<IHttpRequest, "headers" | "url">) => import("fp-ts/lib/Either").Either<import("@stoplight/prism-core").IPrismDiagnostic, unknown>;
export declare const openIdConnect: (input: Pick<IHttpRequest, "headers" | "url">) => import("fp-ts/lib/Either").Either<import("@stoplight/prism-core").IPrismDiagnostic, unknown>;
