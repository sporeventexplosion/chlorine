"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// uses combining diacritical marks
const tones = '\u0304\u0301\u030c\u0300';
const pinyin = (str) => {
    if (!(/^[a-z]+[0-4]?$/i).test(str)) {
        throw new Error(`"${str}" is not a valid source string`);
    }
    const hasTone = /[0-4]/.test(str[str.length - 1]);
    const tone = hasTone ? parseInt(str[str.length - 1]) : 0;
    str = hasTone ? str.substring(0, str.length - 1) : str;
    const vReplaced = str.replace(/v/g, '\u00fc');
    if (tone === 0) {
        return vReplaced;
    }
    const finalStart = str.search(/(?:a|e|ai|ei|ao|ou|an|en|ang|eng|ong|er|i|in|ing|u|un|v|vn)$/);
    if (finalStart === -1) {
        return vReplaced;
    }
    return vReplaced.substring(0, finalStart + 1) + tones[tone - 1] + vReplaced.substring(finalStart + 1);
};
exports.default = pinyin;
console.log('di4 zi3 gui1 sheng4 ren2 xun4 shou3 xiao4 ti4 ci4 jin3 xin4 zhuang4'.split(' ').map((u) => pinyin(u)).join(' '));
