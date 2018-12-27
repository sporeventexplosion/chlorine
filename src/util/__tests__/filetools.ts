import { getParts, normalizeLines, normalizeSingleLine } from '../filetools';

const toArray = <K, V>(map: Map<K, V>) => Array.from(map);

describe('getParts', () => {
  test('returns default section on empty input', () => {
    expect(toArray(getParts(''))).toEqual([['$$default', '']]);
  });
  test('uses \\n for newlines', () => {
    expect(toArray(getParts('test\ntest\n'))).toEqual([['$$default', '\ntest\n']]);
    expect(toArray(getParts('test\r\ntest\r\n'))).toEqual([['$$default', '\ntest\n']]);
  });
})
