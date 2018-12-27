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
const depinyinify = (src) => {
    src = src.replace(/\u00fc/g, 'v');
    const a = 'āáǎà';
    const o = 'ōóǒò';
    const e = 'ēéěè';
    const i = 'īíǐì';
    const u = 'ūúǔù';
    const v = 'ǖǘǚǜ';
    const a_re = /[āáǎà]/g;
    const o_re = /[ōóǒò]/g;
    const e_re = /[ēéěè]/g;
    const i_re = /[īíǐì]/g;
    const u_re = /[ūúǔù]/g;
    const v_re = /[ǖǘǚǜ]/g;
    const a_pos = src.search(a_re);
    const o_pos = src.search(o_re);
    const e_pos = src.search(e_re);
    const i_pos = src.search(i_re);
    const u_pos = src.search(u_re);
    const v_pos = src.search(v_re);
    if (a_pos >= 0) {
        return src.replace(a_re, 'a') + (a.indexOf(src[a_pos]) + 1);
    }
    if (o_pos >= 0) {
        return src.replace(o_re, 'o') + (o.indexOf(src[o_pos]) + 1);
    }
    if (e_pos >= 0) {
        return src.replace(e_re, 'e') + (e.indexOf(src[e_pos]) + 1);
    }
    if (i_pos >= 0) {
        return src.replace(i_re, 'i') + (i.indexOf(src[i_pos]) + 1);
    }
    if (u_pos >= 0) {
        return src.replace(u_re, 'u') + (u.indexOf(src[u_pos]) + 1);
    }
    if (v_pos >= 0) {
        return src.replace(v_re, 'v') + (v.indexOf(src[v_pos]) + 1);
    }
    return src + '0';
};
const group = (n) => (arr) => {
    const ret = [];
    let l = 0;
    for (let i = 0; i < arr.length;) {
        const g = [];
        for (let j = 0; j < n && i < arr.length; i++, j++) {
            g.push(arr[i]);
        }
        ret.push(g);
    }
    return ret;
};
fs.writeFileSync('autopinyin-processed.txt', fs.readFileSync('autopinyin.txt')
    .toString()
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => group(3)(line.replace(/,/g, '').split(' ').map((c) => depinyinify(c))).map((g) => g.join(' ')).join(', ')).join('\n\n'));
