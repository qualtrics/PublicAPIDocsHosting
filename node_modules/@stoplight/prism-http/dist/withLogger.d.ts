import { Logger } from 'pino';
export default function withLogger<T>(run: (E: Logger) => T): import("fp-ts/lib/Reader").Reader<Logger, T>;
