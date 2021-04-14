import { IHttpOperation } from '@stoplight/types';
export * from './types';
export * from './getHttpOperations';
export * from './mocker/errors';
export * from './router/errors';
export * from './mocker/serializer/style';
export { generate as generateHttpParam } from './mocker/generator/HttpParamGenerator';
import { IHttpConfig, IHttpResponse, IHttpRequest, PickRequired, IHttpProxyConfig } from './types';
export declare const createInstance: (defaultConfig: IHttpConfig | IHttpProxyConfig, components: PickRequired<Partial<import("@stoplight/prism-core").IPrismComponents<IHttpOperation, IHttpRequest, IHttpResponse, IHttpConfig>>, "logger">) => import("@stoplight/prism-core").IPrism<IHttpOperation, IHttpRequest, IHttpResponse, IHttpConfig>;
