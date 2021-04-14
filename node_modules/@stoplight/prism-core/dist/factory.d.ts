import { IPrism, IPrismComponents, IPrismConfig } from './types';
export declare function factory<Resource, Input, Output, Config extends IPrismConfig>(defaultConfig: Config, components: IPrismComponents<Resource, Input, Output, Config>): IPrism<Resource, Input, Output, Config>;
