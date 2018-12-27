import pinyin from './pinyin';

const getParts = (input: string): Map<string, string> => {
  const lines = input.split(/\r?\n/);
  // maps iterate in insertion order :)
  const sections: Map<string, number> = new Map();
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.substr(0, 2) === '#(') {
      const sectionMatch = (/^#\([0-9a-z\-]+\)/i).exec(line);
      if (sectionMatch == null) {
        throw new Error(`Invalid section heading on line ${i + 1}`);
      }
      const sectionHead = sectionMatch[0];
      const sectionName = sectionHead.substring(2, sectionHead.length - 1);
      if (sections.has(sectionName)) {
        throw new Error(`Duplicate section name "${ sectionName }" on line ${ i + 1 }`);
      }
      sections.set(sectionName, i);
    }
  }

  let prevName = '$$default';
  let prevLine = 0;
  const ret: Map<string, string> = new Map();
  for (const [ name, line ] of sections) {
    if (line === 0) {
      prevName = name;
    }
    if (line > prevLine) {
      ret.set(prevName, lines.slice(prevLine, line).join('\n').substr(prevName.length + 3));
      prevLine = line;
      prevName = name;
    }
  }
  // must be true, right?
  if (lines.length > prevLine) {
    ret.set(prevName, lines.slice(prevLine).join('\n').substr(prevName.length + 3));
  }
  return ret;
};

const normalizeLines = (str: string): string[] => str.trim()
  .split(/\r?\n/)
  .map((line) => line.trim())
  .filter((line) => line.length > 0);

const normalizeSingleLine = (str: string): string => normalizeLines(str).join('');

export { getParts, normalizeLines, normalizeSingleLine };
