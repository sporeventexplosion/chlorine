// precomposed unicode characters used in pinyin
const a = 'āáǎà';
const o = 'ōóǒò';
const e = 'ēéěè';
const i = 'īíǐì';
const u = 'ūúǔù';
const v = 'ǖǘǚǜ';

const aRe = /[āáǎà]/;
const oRe = /[ōóǒò]/;
const eRe = /[ēéěè]/;
const iRe = /[īíǐì]/;
const uRe = /[ūúǔù]/;
const vRe = /[ǖǘǚǜ]/;

const depinyinify = (src: string) => {
  const str = src.replace(/\u00fc/g, 'v');

  const aPos = str.search(aRe);
  if (aPos >= 0) {
    return str.replace(aRe, 'a') + (a.indexOf(str[aPos]) + 1);
  }
  const oPos = str.search(oRe);
  if (oPos >= 0) {
    return str.replace(oRe, 'o') + (o.indexOf(str[oPos]) + 1);
  }
  const ePos = str.search(eRe);
  if (ePos >= 0) {
    return str.replace(eRe, 'e') + (e.indexOf(str[ePos]) + 1);
  }
  const iPos = str.search(iRe);
  if (iPos >= 0) {
    return str.replace(iRe, 'i') + (i.indexOf(str[iPos]) + 1);
  }
  const uPos = str.search(uRe);
  if (uPos >= 0) {
    return str.replace(uRe, 'u') + (u.indexOf(str[uPos]) + 1);
  }
  const vPos = str.search(vRe);
  if (vPos >= 0) {
    return str.replace(vRe, 'v') + (v.indexOf(str[vPos]) + 1);
  }
  return str + '0';
};

export { depinyinify };
