import expect from 'expect';
import { getProjectOnScrollPosition } from './HomeHelpers';

describe('GetActiveScrollPosition', () => {
  it('should exist', () => {
    const scrollPosition = {
      mainOffsetTop: 40,
      scrollPosition: 140,
      workTextOffsetHeight: 120,
      workTextOffsetTop: 372,
    };
    getProjectOnScrollPosition([], scrollPosition);
  });
  it('should return correct project name depnding on scroll position 1', () => {
    const projects = [
      {
        id: 1,
        title: 'turbo',
        state: false,
        element: '',
        offset: 512,
        height: 440,
      },
      {
        id: 2,
        title: 'welfare',
        state: false,
        element: '',
        offset: 932,
        height: 400,
      },
    ];
    const positions = {
      mainOffsetTop: 40,
      scrollPosition: 400,
      workTextOffsetHeight: 120,
      workTextOffsetTop: 372,
    };
    const expected = 'turbo';
    const actual = getProjectOnScrollPosition(projects, positions);
    expect(actual).toEqual(expected);
  });
  it('should return correct project name depnding on scroll position 2', () => {
    const projects = [
      {
        id: 1,
        title: 'turbo',
        state: false,
        element: '',
        offset: 512,
        height: 440,
      },
      {
        id: 2,
        title: 'welfare',
        state: false,
        element: '',
        offset: 932,
        height: 400,
      },
    ];
    const positions = {
      mainOffsetTop: 40,
      scrollPosition: 543,
      workTextOffsetHeight: 120,
      workTextOffsetTop: 372,
    };
    const expected = 'welfare';
    const actual = getProjectOnScrollPosition(projects, positions);
    expect(actual).toEqual(expected);
  });

  it('should return default if no matches are found', () => {
    const projects = [
      {
        id: 1,
        title: 'turbo',
        state: false,
        element: '',
        offset: 320,
        height: 200,
      },
    ];
    const positions = {
      mainOffsetTop: 40,
      scrollPosition: 0,
      workTextOffsetHeight: 120,
      workTextOffsetTop: 372,
    };
    const scrollPosition = 300;
    const expected = 'Hello';
    const actual = getProjectOnScrollPosition(projects, positions);
    expect(actual).toEqual(expected);
  });
});
