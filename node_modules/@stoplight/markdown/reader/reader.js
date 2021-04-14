"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reader = void 0;
const parse_1 = require("../parse");
const stringify_1 = require("../stringify");
const from_spec_1 = require("./transformers/from-spec");
const to_spec_1 = require("./transformers/to-spec");
class Reader {
    constructor() {
        this.fromSpec = from_spec_1.fromSpec;
        this.toSpec = to_spec_1.toSpec;
    }
    fromLang(raw) {
        return parse_1.parse(raw);
    }
    toLang(data) {
        return stringify_1.stringify(data, {
            commonmark: true,
            gfm: true,
            bullet: '*',
            fence: '`',
            fences: true,
            incrementListMarker: true,
            listItemIndent: '1',
        });
    }
    read(raw) {
        return this.fromSpec(this.fromLang(raw));
    }
}
exports.Reader = Reader;
//# sourceMappingURL=reader.js.map