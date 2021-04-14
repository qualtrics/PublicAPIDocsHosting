import * as pino from 'pino';
declare function createLogger(name: string, overrideOptions?: pino.LoggerOptions, destination?: pino.DestinationStream): pino.Logger;
export { createLogger };
