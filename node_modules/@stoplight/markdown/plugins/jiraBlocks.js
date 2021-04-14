"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1() {
    const { Compiler, Parser } = this;
    if (Compiler !== void 0) {
        Compiler.prototype.visitors.jira = compileJiraBlock;
    }
    else if (Parser !== void 0) {
        Parser.prototype.blockTokenizers.jira = tokenizeJiraBlock;
        Parser.prototype.interruptParagraph.push(['jira']);
        const methods = Parser.prototype.blockMethods;
        methods.splice(methods.indexOf('fencedCode') + 1, 0, 'jira');
    }
}
exports.default = default_1;
const blockStart = /^\[block:([A-Za-z]+)\][^\S\n]*(?=\n)/;
const blockEnd = /\[\/block\][^\S\n]*(?=\n|$)/;
function tokenizeJiraBlock(eat, value, silent) {
    const blockStartMatch = blockStart.exec(value);
    const blockEndMatch = blockEnd.exec(value);
    if (blockStartMatch !== null && blockEndMatch !== null) {
        if (silent) {
            return true;
        }
        const node = {
            type: 'jira',
            code: blockStartMatch[1],
            value: value.slice(blockStartMatch[0].length + 1, blockEndMatch.index - 1),
        };
        return eat(value.slice(0, blockEndMatch.index + blockEndMatch[0].length))(node);
    }
    return false;
}
function compileJiraBlock(node) {
    return `[block:${node.code}]\n${node.value}\n[/block]`;
}
//# sourceMappingURL=jiraBlocks.js.map