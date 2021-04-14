import { HttpParamDeserializerRegistry } from './registry';
export declare const header: HttpParamDeserializerRegistry<import("@stoplight/types").Dictionary<string, string>>;
export declare const query: HttpParamDeserializerRegistry<import("@stoplight/types").Dictionary<string | string[], string>>;
export declare const path: HttpParamDeserializerRegistry<import("@stoplight/types").Dictionary<string, string>>;
export declare const body: HttpParamDeserializerRegistry<import("@stoplight/types").Dictionary<string | string[], string>>;
