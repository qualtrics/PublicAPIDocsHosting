import { RemarkParseOptions } from 'remark-parse';
import * as unified from 'unified';
import { MarkdownParserResult } from './types';
export declare const parseWithPointers: (value: string, opts?: Partial<RemarkParseOptions> | undefined, processor?: unified.Processor<unified.Settings> | undefined) => MarkdownParserResult;
