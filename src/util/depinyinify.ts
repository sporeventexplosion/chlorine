import * as fs from 'fs';

const depinyinify = (src: string) => {
  src = src.replace(/\u00fc/g, 'v');
  const a = 'āáǎà';
  const o = 'ōóǒò';
  const e = 'ēéěè';
  const i = 'īíǐì';
  const u = 'ūúǔù';
  const v = 'ǖǘǚǜ';
  const aRe = /[āáǎà]/g;
  const oRe = /[ōóǒò]/g;
  const eRe = /[ēéěè]/g;
  const iRe = /[īíǐì]/g;
  const uRe = /[ūúǔù]/g;
  const vRe = /[ǖǘǚǜ]/g;

  const aPos = src.search(aRe);
  const oPos = src.search(oRe);
  const ePos = src.search(eRe);
  const iPos = src.search(iRe);
  const uPos = src.search(uRe);
  const vPos = src.search(vRe);
  if (aPos >= 0) {
    return src.replace(aRe, 'a') + (a.indexOf(src[aPos]) + 1);
  }
  if (oPos >= 0) {
    return src.replace(oRe, 'o') + (o.indexOf(src[oPos]) + 1);
  }
  if (ePos >= 0) {
    return src.replace(eRe, 'e') + (e.indexOf(src[ePos]) + 1);
  }
  if (iPos >= 0) {
    return src.replace(iRe, 'i') + (i.indexOf(src[iPos]) + 1);
  }
  if (uPos >= 0) {
    return src.replace(uRe, 'u') + (u.indexOf(src[uPos]) + 1);
  }
  if (vPos >= 0) {
    return src.replace(vRe, 'v') + (v.indexOf(src[vPos]) + 1);
  }
  return src + '0';
};

const group = (n: number) => <T>(arr: T[]): T[][] => {
  const ret: T[][] = [];
  let l = 0;
  for (let i = 0; i < arr.length;) {
    const g: T[] = [];
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
  .map((line) => group(3)(
    line.replace(/,/g, '').split(' ').map((c) => depinyinify(c))
  ).map((g) => g.join(' ')).join(', ')).join('\n\n')
);
