import { getParts, normalizeLines, normalizeSingleLine } from '../filetools';

describe('getParts', () => {
  test('returns default part on empty input', () => {
    expect(getParts('')).toEqual([['$$default', '']]);
  });
  test('returns default part', () => {
    expect(getParts('no part')).toEqual([['$$default', 'no part']]);
    expect(getParts('(no) part')).toEqual([['$$default', '(no) part']]);
    expect(getParts('\ntest')).toEqual([['$$default', '\ntest']]);
  });
  test('returns part starting on first line', () => {
    expect(getParts('#(a)')).toEqual([['a', '']]);
    expect(getParts('#(part) test test\n')).toEqual([['part', ' test test\n']]);
  });
  test('returns default part with other parts', () => {
    expect(getParts('\n#(a)'))
      .toEqual([['$$default', '\n'], ['a', '']]);

    expect(getParts('\ntest\n\n#(part) test test\n'))
      .toEqual([['$$default', '\ntest\n\n'], ['part', ' test test\n']]);

    expect(getParts('\ntest\n\n#(first) test test\n#(second)more test'))
      .toEqual([['$$default', '\ntest\n\n'], ['first', ' test test\n'], ['second', 'more test']]);
  });
  test('throws on empty part tag', () => {
    expect(() => getParts('#() text')).toThrow();
    expect(() => getParts('\n#() other text')).toThrow();
    expect(() => getParts('#(valid)\n#(also-valid)\n#() other text')).toThrow();
  });
  test('throws on part tag with illegal characters', () => {
    expect(() => getParts('#($$default) test')).toThrow();
    expect(() => getParts('\n#($$default) test')).toThrow();
    expect(() => getParts('#(#) text')).toThrow();
    expect(() => getParts('\n#(*) other text')).toThrow();
    expect(() => getParts('#()\n#(also-valid)\n#(in_valid) other text')).toThrow();
  });
  test('throws on unclosed part tag', () => {
    expect(() => getParts('#(')).toThrow();
    expect(() => getParts('#(\n')).toThrow();
    expect(() => getParts('#(test')).toThrow();
    expect(() => getParts('#(strings\n')).toThrow();
    expect(() => getParts('#(test test\n)')).toThrow();
    expect(() => getParts('#(test test\n#(valid))')).toThrow();

    expect(() => getParts('\n#(')).toThrow();
    expect(() => getParts('test\n#(\n')).toThrow();
    expect(() => getParts('test\n#(first)\n#(test')).toThrow();
    expect(() => getParts('test\n#(strings\n')).toThrow();
    expect(() => getParts('test\n#(test test\n)')).toThrow();
  });
  test('preserves newlines', () => {
    expect(getParts('\n\r\n')).toEqual([['$$default', '\n\r\n']]);
    expect(getParts('test\ntest\n')).toEqual([['$$default', 'test\ntest\n']]);
    expect(getParts('test\r\ntest\r\n')).toEqual([['$$default', 'test\r\ntest\r\n']]);
  });
  test('throws on duplicate part tag names', () => {
    expect(() => getParts('#(valid1)\n#(valid2)\n#(valid1)')).toThrow();
    expect(() => getParts('#(valid1)\n#(valid2)\n#(valid2)')).toThrow();
  });
});

describe('normalizeLines', () => {
  test('returns empty array on empty string', () => {
    expect(normalizeLines('')).toEqual([]);
  });
  test('returns empty array on string with only whitespace', () => {
    expect(normalizeLines('  \t \u2028 ')).toEqual([]);
    expect(normalizeLines('\n\n\r\n')).toEqual([]);
    expect(normalizeLines('\n \v\t \r\n \u205f \n \r\n ')).toEqual([]);
  });
  test('removes whitespace between lines', () => {
    expect(normalizeLines('  \ta string\n   \u2006 \r\n \u2028 some more text\n \f '))
      .toEqual(['a string', 'some more text']);
    expect(normalizeLines('  \ta string\n \n  \u1680 \r\n \u2028 some more text\n\n\n \f '))
      .toEqual(['a string', 'some more text']);
  });
});

describe('normalizeSingleLine', () => {
  test('returns string without whitespace', () => {
    expect(normalizeSingleLine('')).toBe('');
    expect(normalizeSingleLine('  \t \u2028 ')).toBe('');
    expect(normalizeSingleLine('\n\n\r\n')).toBe('');
    expect(normalizeSingleLine('\n \v\t \r\n \u205f \n \r\n ')).toBe('');

    expect(normalizeSingleLine('  \ta string\n   \u2006 \r\n \u2028 some more text\n \f '))
      .toBe('a stringsome more text');
    expect(normalizeSingleLine('  \ta string\n \n  \u1680 \r\n \u2028 some more text\n\n\n \f '))
      .toBe('a stringsome more text');
  });
});
