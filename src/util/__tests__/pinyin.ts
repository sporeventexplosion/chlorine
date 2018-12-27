import pinyin from '../pinyin';

// a: 'āáǎà'
// o: 'ōóǒò'
// e: 'ēéěè'
// i: 'īíǐì'
// u: 'ūúǔù'
// v: 'ǖǘǚǜ', 'ü'

describe('pinyin.ts', () => {
  test('fails on empty input', () => {
    expect(() => pinyin('')).toThrow();
    expect(() => pinyin('  ')).toThrow();
  });
  test('fails on non-lowercase input', () => {
    expect(() => pinyin('AN')).toThrow();
    expect(() => pinyin('yV')).toThrow();
  });
  test('works without a tone number', () => {
    expect(pinyin('a')).toBe('a');
    expect(pinyin('yin')).toBe('yin');
    expect(pinyin('suan')).toBe('suan');
    expect(pinyin('lv')).toBe('lü');
  });
  test('works with syllables without a final', () => {
    expect(pinyin('n')).toBe('n');
    expect(pinyin('n0')).toBe('n');
    expect(pinyin('m')).toBe('m');
    expect(pinyin('m0')).toBe('m');
  });
  test('fails with syllables without a final but with a tone', () => {
    expect(() => pinyin('n3')).toThrow();
    expect(() => pinyin('m4')).toThrow();
  });
  test('works with tone number 0', () => {
    expect(pinyin('a0')).toBe('a');
    expect(pinyin('yin0')).toBe('yin');
    expect(pinyin('suan0')).toBe('suan');
    expect(pinyin('lv0')).toBe('lü');
  });
  test('works with tone numbers 1-4', () => {
    expect(pinyin('e2')).toBe('é');
    expect(pinyin('cha1')).toBe('chā');
    expect(pinyin('cha4')).toBe('chà');
    expect(pinyin('zhuan1')).toBe('zhuān');
    expect(pinyin('zhuan4')).toBe('zhuàn');
    expect(pinyin('lv3')).toBe('lǚ');
    expect(pinyin('lve4')).toBe('lüè');
  });
});
