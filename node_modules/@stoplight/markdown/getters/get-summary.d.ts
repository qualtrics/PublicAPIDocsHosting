import * as Unist from 'unist';
export interface IGetSummaryOpts {
    truncate?: number;
}
export declare const getSummary: (data?: Unist.Node | undefined, opts?: IGetSummaryOpts) => string | void | undefined;
