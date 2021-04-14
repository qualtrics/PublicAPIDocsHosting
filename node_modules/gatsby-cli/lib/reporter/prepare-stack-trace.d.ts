export declare class ErrorWithCodeFrame extends Error {
    codeFrame: string;
    constructor(...args: any[]);
}
export declare function prepareStackTrace(error: Error, source: string): Promise<ErrorWithCodeFrame>;
