"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const getParts = (input) => {
    const lines = input.split(/\r?\n/);
    // maps iterate in insertion order :)
    const sections = new Map();
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.substr(0, 2) === '#(') {
            const sectionMatch = (/^#\([0-9a-z\-]+\)/i).exec(line);
            if (sectionMatch == null) {
                throw new Error(`Invalid section heading on line ${i + 1}`);
            }
            const sectionHead = sectionMatch[0];
            const sectionName = sectionHead.substring(2, sectionHead.length - 1);
            if (sections.has(sectionName)) {
                throw new Error(`Duplicate section name "${sectionName}" on line ${i + 1}`);
            }
            sections.set(sectionName, i);
        }
    }
    console.log(sections);
    let prevName = '$$default';
    let prevLine = 0;
    const ret = new Map();
    for (const [name, line] of sections) {
        if (line === 0) {
            prevName = name;
        }
        if (line > prevLine) {
            ret.set(prevName, lines.slice(prevLine, line).join('\n').substr(prevName.length + 3));
            prevLine = line;
            prevName = name;
        }
    }
    // must be true, right?
    if (lines.length > prevLine) {
        ret.set(prevName, lines.slice(prevLine).join('\n').substr(prevName.length + 3));
    }
    return ret;
};
console.log(getParts(fs.readFileSync('chinese.txt').toString()));
