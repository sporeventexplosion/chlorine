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
