"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Builder = void 0;
const reader_1 = require("./reader");
const stringify_1 = require("./stringify");
class Builder {
    constructor(reader = new reader_1.Reader()) {
        this.reader = reader;
        this.root = {
            type: 'root',
            children: [],
        };
    }
    addMarkdown(markdown) {
        this.root.children.push(...this.reader.toSpec(this.reader.fromLang(markdown)).children);
        return this;
    }
    addChild(node) {
        this.root.children.push(node);
        return this;
    }
    toString() {
        return stringify_1.stringify(this.reader.fromSpec(this.root));
    }
}
exports.Builder = Builder;
//# sourceMappingURL=builder.js.map