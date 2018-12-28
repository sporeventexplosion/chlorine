import { depinyinify } from '../depinyinify';

// precomposed unicode characters used in pinyin
// a: 'āáǎà'
// o: 'ōóǒò'
// e: 'ēéěè'
// i: 'īíǐì'
// u: 'ūúǔù'
// v: 'ǖǘǚǜ', 'ü'

describe('depinyinify', () => {
  test('Appends a "0" to input without a tone', () => {
    expect(depinyinify('a')).toBe('a0');
    expect(depinyinify('e')).toBe('e0');
    expect(depinyinify('shuang')).toBe('shuang0');
    expect(depinyinify('m')).toBe('m0');
    expect(depinyinify('ng')).toBe('ng0');
  });
  test('changes ü without a tone to v', () => {
    expect(depinyinify('ü')).toBe('v0');
    expect(depinyinify('lü')).toBe('lv0');
    expect(depinyinify('nüè')).toBe('nve4');
  });
  test('removes tone marks and appends tone number to output', () => {
    expect(depinyinify('zhuā')).toBe('zhua1');
    expect(depinyinify('zhuá')).toBe('zhua2');
    expect(depinyinify('zhuǎ')).toBe('zhua3');
    expect(depinyinify('zhuà')).toBe('zhua4');

    expect(depinyinify('sōng')).toBe('song1');
    expect(depinyinify('sóng')).toBe('song2');
    expect(depinyinify('sǒng')).toBe('song3');
    expect(depinyinify('sòng')).toBe('song4');

    expect(depinyinify('chēn')).toBe('chen1');
    expect(depinyinify('chén')).toBe('chen2');
    expect(depinyinify('chěn')).toBe('chen3');
    expect(depinyinify('chèn')).toBe('chen4');

    expect(depinyinify('qī')).toBe('qi1');
    expect(depinyinify('qí')).toBe('qi2');
    expect(depinyinify('qǐ')).toBe('qi3');
    expect(depinyinify('qì')).toBe('qi4');

    expect(depinyinify('gū')).toBe('gu1');
    expect(depinyinify('gú')).toBe('gu2');
    expect(depinyinify('gǔ')).toBe('gu3');
    expect(depinyinify('gù')).toBe('gu4');

    expect(depinyinify('lǖ')).toBe('lv1');
    expect(depinyinify('lǘ')).toBe('lv2');
    expect(depinyinify('lǚ')).toBe('lv3');
    expect(depinyinify('lǜ')).toBe('lv4');
  });
});
