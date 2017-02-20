import expect from 'expect';
import { getProjectOnScrollPosition } from './HomeHelpers';

describe('GetActiveScrollPosition', () => {
  it('should exist', () => {
    getProjectOnScrollPosition();
  });
  it('should return correct project name depnding on scroll position 1', () => {
    const projects = [
      {
        id: 1,
        title: 'turbo',
        state: false,
        element: '',
        offset: 320,
        height: 200,
      },
      {
        id: 2,
        title: 'welfare',
        state: false,
        element: '',
        offset: 520,
        height: 300,
      },
    ];
    const scrollPosition = 320;
    const expected = 'turbo';
    const actual = getProjectOnScrollPosition(projects, scrollPosition);
    expect(actual).toEqual(expected);
  });
  it('should return correct project name depnding on scroll position 2', () => {
    const projects = [
      {
        id: 1,
        title: 'turbo',
        state: false,
        element: '',
        offset: 320,
        height: 200,
      },
      {
        id: 2,
        title: 'welfare',
        state: false,
        element: '',
        offset: 520,
        height: 300,
      },
    ];
    const scrollPosition = 540;
    const expected = 'welfare';
    const actual = getProjectOnScrollPosition(projects, scrollPosition);
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
    const scrollPosition = 300;
    const expected = 'friend';
    const actual = getProjectOnScrollPosition(projects, scrollPosition);
    expect(actual).toEqual(expected);
  });
});
