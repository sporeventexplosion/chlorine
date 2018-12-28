import {
  getGroupedLine,
  getGroupedLines,
  getLinear,
  GroupedLinesCompositor,
  LinearCompositor,
} from '../compositor';

describe('getLinear', () => {
  test('Returns correct blocks', () => {
    expect(getLinear([], [])).toEqual({
      type: 'linear',
      content: [],
      style: '',
      before: 0,
      after: 0,
    });

    expect(getLinear(['一', '二', '三'], ['yi', 'er', 'san'])).toEqual({
      type: 'linear',
      content: [['一', 'yi'], ['二', 'er'], ['三', 'san']],
      style: '',
      before: 0,
      after: 0,
    });
  });
  test('Correctly applies options', () => {
    expect(getLinear([], [], {})).toEqual({
      type: 'linear',
      content: [],
      style: '',
      before: 0,
      after: 0,
    });
    expect(getLinear([], [], {
      style: 'test-style',
      before: 1,
      after: 2,
    })).toEqual({
      type: 'linear',
      content: [],
      style: 'test-style',
      before: 1,
      after: 2,
    });
  });
});

describe('getGroupedLine', () => {
  test('Returns correct groups', () => {
    expect(getGroupedLine([], [])).toEqual({
      type: 'grouped-line',
      content: [],
      style: '',
      before: 0,
      after: 0,
    });

    expect(getGroupedLine([[]], [[]])).toEqual({
      type: 'grouped-line',
      content: [getLinear([], [])],
      style: '',
      before: 0,
      after: 0,
    });

    expect(getGroupedLine([['一', '二']], [['yi', 'er']])).toEqual({
      type: 'grouped-line',
      content: [
        getLinear(['一', '二'], ['yi', 'er']),
      ],
      style: '',
      before: 0,
      after: 0,
    });

    expect(getGroupedLine([['一', '二'], ['三'], ['四', '五']], [['yi', 'er'], ['san'], ['si', 'wu']])).toEqual({
      type: 'grouped-line',
      content: [
        getLinear(['一', '二'], ['yi', 'er']),
        getLinear(['三'], ['san']),
        getLinear(['四', '五'], ['si', 'wu']),
      ],
      style: '',
      before: 0,
      after: 0,
    });
  });
  test('Correctly applies options', () => {
    expect(getGroupedLine([], [], {})).toEqual({
      type: 'grouped-line',
      content: [],
      style: '',
      before: 0,
      after: 0,
    });

    expect(getGroupedLine([], [], {
      style: 'test-style',
      before: 5,
      after: 6,
    })).toEqual({
      type: 'grouped-line',
      content: [],
      style: 'test-style',
      before: 5,
      after: 6,
    });

    expect(getGroupedLine(
      [['一', '二'], ['三'], ['四', '五']],
      [['yi', 'er'], ['san'], ['si', 'wu']],
      {
        before: 1,
        after: 2,
        style: 'line-style',
        groupBefore: 3,
        groupAfter: 4,
        groupStyle: 'group-style',
      },
    )).toEqual({
      type: 'grouped-line',
      content: [
        getLinear(['一', '二'], ['yi', 'er'], {style: 'group-style', before: 3, after: 4}),
        getLinear(['三'], ['san'], {style: 'group-style', before: 3, after: 4}),
        getLinear(['四', '五'], ['si', 'wu'], {style: 'group-style', before: 3, after: 4}),
      ],
      style: 'line-style',
      before: 1,
      after: 2,
    });
  });
});

describe('getGroupedLines', () => {
  test('Returns correct lines', () => {
    expect(getGroupedLines([], [])).toEqual({
      type: 'grouped-lines',
      content: [],
      style: '',
      before: 0,
      after: 0,
    });

    expect(getGroupedLines([[]], [[]])).toEqual({
      type: 'grouped-lines',
      content: [getGroupedLine([], [])],
      style: '',
      before: 0,
      after: 0,
    });

    expect(getGroupedLines(
      [[['一', '二'], ['三']]],
      [[['yi', 'er'], ['san']]],
    )).toEqual({
      type: 'grouped-lines',
      content: [
        getGroupedLine([['一', '二'], ['三']], [['yi', 'er'], ['san']]),
      ],
      style: '',
      before: 0,
      after: 0,
    });

    expect(getGroupedLines(
      [
        [['一', '二'], ['三']],
        [['四'], ['五', '六']],
      ],
      [
        [['yi', 'er'], ['san']],
        [['si'], ['wu', 'liu']],
      ],
    )).toEqual({
      type: 'grouped-lines',
      content: [
        getGroupedLine([['一', '二'], ['三']], [['yi', 'er'], ['san']]),
        getGroupedLine([['四'], ['五', '六']], [['si'], ['wu', 'liu']]),
      ],
      style: '',
      before: 0,
      after: 0,
    });
  });
  test('Correctly applies options', () => {
    expect(getGroupedLines([], [], {})).toEqual({
      type: 'grouped-lines',
      content: [],
      style: '',
      before: 0,
      after: 0,
    });

    expect(getGroupedLines([], [], {
      style: 'test-style',
      before: 5,
      after: 6,
    })).toEqual({
      type: 'grouped-lines',
      content: [],
      style: 'test-style',
      before: 5,
      after: 6,
    });

    expect(getGroupedLines(
      [
        [['一', '二'], ['三']],
        [['四'], ['五', '六']],
      ],
      [
        [['yi', 'er'], ['san']],
        [['si'], ['wu', 'liu']],
      ],
      {
        before: 1,
        after: 2,
        style: 'block-style',
        lineBefore: 3,
        lineAfter: 4,
        lineStyle: 'line-style',
        groupBefore: 5,
        groupAfter: 6,
        groupStyle: 'group-style',
      },
    )).toEqual({
      type: 'grouped-lines',
      content: [
        getGroupedLine(
          [['一', '二'], ['三']],
          [['yi', 'er'], ['san']],
          {
            style: 'line-style',
            before: 3,
            after: 4,
            groupBefore: 5,
            groupAfter: 6,
            groupStyle: 'group-style',
          },
        ),
        getGroupedLine(
          [['四'], ['五', '六']],
          [['si'], ['wu', 'liu']],
          {
            style: 'line-style',
            before: 3,
            after: 4,
            groupBefore: 5,
            groupAfter: 6,
            groupStyle: 'group-style',
          },
        ),
      ],
      style: 'block-style',
      before: 1,
      after: 2,
    });
  });
});

describe('LinearCompositor', () => {
  test('Gets lines', () => {
    expect(LinearCompositor('', '')).toEqual({
      layout: getLinear([], []),
    });

    expect(LinearCompositor('一', 'yi1')).toEqual({
      layout: getLinear(['一'], ['yī']),
    });

    expect(LinearCompositor('一二三', 'yi1 er4 san1')).toEqual({
      layout: getLinear(['一', '二', '三'], ['yī', 'èr', 'sān']),
    });
  });

  test('Correctly applies options', () => {
    expect(LinearCompositor('一', 'yi1', {})).toEqual({
      layout: getLinear(['一'], ['yī'], {}),
    });

    expect(LinearCompositor(
      '一',
      'yi1',
      {style: 'test-style', before: 1, after: 2},
    )).toEqual({
      layout: getLinear(['一'], ['yī'], {style: 'test-style', before: 1, after: 2}),
    });

    expect(LinearCompositor(
      '一二三',
      'yi1 er4 san1',
      {style: 'test-style', before: 1, after: 2},
    )).toEqual({
      layout: getLinear(
        ['一', '二', '三'],
        ['yī', 'èr', 'sān'],
        {style: 'test-style', before: 1, after: 2},
      ),
    });
  });
});

describe('GroupedLinesCompositor', () => {
  test('Gets lines', () => {
    expect(GroupedLinesCompositor('', '')).toEqual({
      layout: getGroupedLines([], []),
    });

    expect(GroupedLinesCompositor('一', 'yi1')).toEqual({
      layout: getGroupedLines([[['一']]], [[['yī']]]),
    });

    expect(GroupedLinesCompositor('一二三', 'yi1 er4 san1')).toEqual({
      layout: getGroupedLines([[['一', '二', '三']]], [[['yī', 'èr', 'sān']]]),
    });
    expect(GroupedLinesCompositor(
      '一二, 三\n四,  五六',
      'yi1 er4, san1\nsi4, wu3 liu4',
    )).toEqual({
      layout: getGroupedLines(
        [
          [['一', '二'], ['三']],
          [['四'], ['五', '六']],
        ],
        [
          [['yī', 'èr'], ['sān']],
          [['sì'], ['wǔ', 'liù']],
        ],
      ),
    });
  });

  test('Correctly applies options', () => {
    expect(GroupedLinesCompositor('', '', {})).toEqual({
      layout: getGroupedLines([], [], {}),
    });

    expect(GroupedLinesCompositor('一', 'yi1', {})).toEqual({
      layout: getGroupedLines([[['一']]], [[['yī']]], {}),
    });

    expect(GroupedLinesCompositor(
      '一二, 三\n四,  五六',
      'yi1 er4, san1\nsi4, wu3 liu4',
      {
        before: 1,
        after: 2,
        style: 'block-style',
        lineBefore: 3,
        lineAfter: 4,
        lineStyle: 'line-style',
        groupBefore: 5,
        groupAfter: 6,
        groupStyle: 'group-style',
      },
    )).toEqual({
      layout: getGroupedLines(
        [
          [['一', '二'], ['三']],
          [['四'], ['五', '六']],
        ],
        [
          [['yī', 'èr'], ['sān']],
          [['sì'], ['wǔ', 'liù']],
        ],
        {
          before: 1,
          after: 2,
          style: 'block-style',
          lineBefore: 3,
          lineAfter: 4,
          lineStyle: 'line-style',
          groupBefore: 5,
          groupAfter: 6,
          groupStyle: 'group-style',
        },
      ),
    });
  });
});
