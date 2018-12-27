import { normalizeLines, normalizeSingleLine } from './filetools';
import pinyin from './pinyin';

interface IDisplayBox {
  type: string;
  style: string;
  before: number;
  after: number;
}

interface ILinearBox extends IDisplayBox {
  type: 'linear';
  content: Array<[string, string]>;
}

interface IGroupedLinesBox extends IDisplayBox {
  type: 'grouped-lines';
  content: IGroupedLineBox[];
}

interface IGroupedLineBox extends IDisplayBox {
  type: 'grouped-line';
  content: ILinearBox[];
}

interface IDisplaySection<T extends IDisplayBox> {
  layout: T;
}

interface ICompositorOptions {
  style?: string;
  before?: number;
  after?: number;

  lineBefore?: number;
  lineAfter?: number;
  lineStyle?: number;

  groupBefore?: number;
  groupAfter?: number;
  groupStyle?: number;
}

const defaultCompositorOptions = {
  style: '',
  before: 0,
  after: 0,
};

type SectionCompositor<T extends IDisplayBox>
  = (chinese: string, ruby: string, options?: ICompositorOptions) => IDisplaySection<T>;

type BoxCompsitor<T, U extends IDisplayBox> = (chinese: T, ruby: T, options?: ICompositorOptions) => U;

const getLinear: BoxCompsitor<string[], ILinearBox> = (chinese, ruby, options = {}) => {
  const units = chinese.map((char, i) => ([char, ruby[i]] as [string, string]));
  return {
    type: 'linear',
    content: units,
    style: options.style || defaultCompositorOptions.style,
    before: options.before || defaultCompositorOptions.before,
    after: options.after || defaultCompositorOptions.after,
  };
};

const LinearCompositor: SectionCompositor<ILinearBox> = (chinese, ruby, options = {}) => {
  const chars = Array.from(normalizeSingleLine(chinese));
  const rubyGroups = normalizeSingleLine(ruby)
    .split(/\s+/)
    .map((group) => pinyin(group));

  const units = chars.map((char, i) => ([char, rubyGroups[i]] as [string, string]));
  return {
    layout: getLinear(chars, rubyGroups, options),
  };
};

const getGroupedLine: BoxCompsitor<string[][], IGroupedLineBox>
  = (chineseLine: string[][], rubyLine: string[][], options = {}) => {
  const groups: ILinearBox[] = [];
  chineseLine.forEach((chinese, i) => {
    const ruby = rubyLine[i];
    groups.push(getLinear(chinese, ruby, Object.assign({}, options, {
      before: options.groupBefore,
      after: options.groupAfter,
      style: options.groupStyle,
    })));
  });

  return {
    type: 'grouped-line',
    content: groups,
    style: options.style || defaultCompositorOptions.style,
    before: options.before || defaultCompositorOptions.before,
    after: options.after || defaultCompositorOptions.after,
  };
};

const getGroupedLines: BoxCompsitor<string[][][], IGroupedLinesBox>
  = (chineseLines: string[][][], rubyLines: string[][][], options = {}) => {
  const groups: IGroupedLineBox[] = [];
  chineseLines.forEach((chinese, i) => {
    const ruby = rubyLines[i];
    groups.push(getGroupedLine(chinese, ruby, Object.assign({}, options, {
      before: options.lineBefore,
      after: options.lineAfter,
      style: options.lineStyle,
    })));
  });

  return {
    type: 'grouped-lines',
    content: groups,
    style: options.style || defaultCompositorOptions.style,
    before: options.before || defaultCompositorOptions.before,
    after: options.after || defaultCompositorOptions.after,
  };
};

const GroupedLinesCompositor: SectionCompositor<IGroupedLinesBox> = (chinese, ruby, options) => {
  if (typeof options === undefined) {
    options = defaultCompositorOptions;
  } else {
    options = Object.assign({}, defaultCompositorOptions, options);
  }

  const chars = normalizeLines(chinese)
    .map((line) => line.split(/,\s*/).map((group) => Array.from(group)));

  const rubyGroups = normalizeLines(ruby)
    .map((line) => line.split(/,\s*/).map((group) => group.split(/\s+/)));

  return {
    layout: getGroupedLines(chars, rubyGroups),
  };
};
