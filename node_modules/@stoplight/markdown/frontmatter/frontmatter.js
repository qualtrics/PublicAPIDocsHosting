"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Frontmatter = void 0;
const types_1 = require("@stoplight/types");
const yaml_1 = require("@stoplight/yaml");
const lodash_1 = require("lodash");
const parseWithPointers_1 = require("../parseWithPointers");
const stringify_1 = require("../stringify");
const isError = ({ severity }) => severity === types_1.DiagnosticSeverity.Error;
const safeParse = (value) => {
    try {
        const { data, diagnostics } = yaml_1.parseWithPointers(String(value));
        if (data === void 0 || (diagnostics.length > 0 && diagnostics.some(isError))) {
            return {};
        }
        return data;
    }
    catch (_a) {
        return {};
    }
};
class Frontmatter {
    constructor(data, mutate = false) {
        const root = typeof data === 'string' ? parseWithPointers_1.parseWithPointers(data).data : mutate ? data : JSON.parse(JSON.stringify(data));
        if (root.type !== 'root') {
            throw new TypeError('Malformed yaml was provided');
        }
        this.document = root;
        if (root.children.length > 0 && root.children[0].type === 'yaml') {
            this.node = root.children[0];
            this.properties = safeParse(this.node.value);
        }
        else {
            this.node = {
                type: 'yaml',
                value: '',
            };
            this.properties = null;
        }
    }
    get isEmpty() {
        for (const _ in this.properties) {
            if (Object.hasOwnProperty.call(this.properties, _)) {
                return false;
            }
        }
        return true;
    }
    getAll() {
        if (this.properties !== null) {
            return this.properties;
        }
    }
    get(prop) {
        if (this.properties !== null) {
            return lodash_1.get(this.properties, prop);
        }
    }
    set(prop, value) {
        if (this.properties === null) {
            this.properties = {};
        }
        lodash_1.set(this.properties, prop, value);
        this.updateDocument();
    }
    unset(prop) {
        if (this.properties !== null) {
            const path = lodash_1.toPath(prop);
            const lastSegment = Number(path[path.length - 1]);
            if (!Number.isNaN(lastSegment)) {
                const baseObj = path.length > 1 ? this.get(path.slice(0, path.length - 1)) : this.getAll();
                if (Array.isArray(baseObj)) {
                    if (baseObj.length < lastSegment)
                        return;
                    lodash_1.pullAt(baseObj, lastSegment);
                }
                else {
                    lodash_1.unset(this.properties, prop);
                }
            }
            else {
                lodash_1.unset(this.properties, prop);
            }
            this.updateDocument();
        }
    }
    stringify() {
        return stringify_1.stringify(this.document);
    }
    static getFrontmatterBlock(value) {
        const match = value.match(/^(\s*\n)?---(?:.|[\n\r\u2028\u2029])*?\n---/);
        return match === null ? void 0 : match[0];
    }
    updateDocument() {
        const children = this.document.children;
        if (!children)
            return;
        const index = children.indexOf(this.node);
        this.node.value = this.isEmpty
            ? ''
            : yaml_1.safeStringify(this.properties, {
                flowLevel: 1,
                indent: 2,
            }).trim();
        if (this.isEmpty) {
            if (index !== -1) {
                children.splice(index, 1);
            }
        }
        else if (index === -1) {
            children.unshift(this.node);
        }
    }
}
exports.Frontmatter = Frontmatter;
//# sourceMappingURL=frontmatter.js.map