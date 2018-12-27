import pinyin from './pinyin';

const getParts = (input: string): Array<[string, string]> => {
  const partStartRegex = /\n#\(/g;
  const partRegex = /\n#\([0-9a-z\-]+\)/gi;

  // special measures to detect part at start of string

  const firstPartStartRegex = /^#\(/g;
  const firstPartRegex = /^#\([0-9a-z\-]+\)/gi;

  const parts: Set<string> = new Set();
  const ret: Array<[string, string]> = [];

  let partName = '$$default';
  let partStart = 0;

  if (firstPartStartRegex.test(input)) {
    const firstSection = firstPartRegex.exec(input);
    if (firstSection == null) {
      throw new Error('Invalid section tag at position 0');
    }
    const match = firstSection[0];
    partName = match.substring(2, match.length - 1);
    parts.add(partName);
    partStart = match.length;
  }

  while (partStartRegex.test(input)) {
    const section = partRegex.exec(input);
    // taking into account leading \n
    const start = partStartRegex.lastIndex - 2;
    // check that start points match
    if (section == null || start - 1 !== partRegex.lastIndex - section[0].length) {
      throw new Error(`Invalid section tag at position ${start}`);
    }
    ret.push([partName, input.substring(partStart, start)]);

    const match = section[0];
    partName = match.substring(3, match.length - 1);
    if (parts.has(partName)) {
      throw new Error(`Duplicate part name ${partName} at position ${start}`);
    }
    parts.add(partName);
    partStart = start + match.length - 1;
  }
  // the last part
  ret.push([partName, input.substring(partStart)]);

  return ret;
};

const normalizeLines = (str: string): string[] => str.trim()
  .split(/\r?\n/)
  .map((line) => line.trim())
  .filter((line) => line.length > 0);

const normalizeSingleLine = (str: string): string => normalizeLines(str).join('');

export { getParts, normalizeLines, normalizeSingleLine };
