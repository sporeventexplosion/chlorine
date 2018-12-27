// uses combining diacritical marks
const tones = '\u0304\u0301\u030c\u0300';

const diacriticals: {[letter: string]: string} = {
  a: 'āáǎà',
  o: 'ōóǒò',
  e: 'ēéěè',
  i: 'īíǐì',
  u: 'ūúǔù',
  v: 'ǖǘǚǜ',
};

const pinyin = (src: string): string => {
  if (!(/^[a-z]+[0-4]?$/).test(src)) {
    throw new Error(`Invalid source string "${src}"`);
  }

  const hasTone = /[0-4]/.test(src[src.length - 1]);
  const tone = hasTone ? parseInt(src[src.length - 1], 10) : 0;
  const str = hasTone ? src.substring(0, src.length - 1) : src;
  if (tone === 0) {
    return str.replace(/v/g, '\u00fc');
  }
  const finalStart = str.search(/(?:a|e|ai|ei|ao|ou|an|en|ang|eng|ong|er|i|in|ing|u|un|v|vn)$/);
  if (finalStart === -1) {
    // the input has a tone but doesn't have a final
    throw new Error(`Invalid source string"${str}": syllables with tone but without final are not supported`);
  }
  return (str.substring(0, finalStart) + diacriticals[str[finalStart]][tone - 1] + str.substring(finalStart + 1))
    .replace(/v/g, '\u00fc');
};

export default pinyin;

// console.log('di4 zi3 gui1 sheng4 ren2 xun4 shou3 xiao4 ti4 ci4 jin3 xin4 zhuang4'.split(' ').map((u) => pinyin(u)).join(' '));
