import expect from 'expect';
import { SortProjectsById } from './HomeHelpers';

describe('SortProjectsById', () => {
  it('should return the array sorted', () => {
    const projects = [
      { id: 2 },
      { id: 7 },
      { id: 10 },
    ];
    const expected = [
      { id: 2 },
      { id: 7 },
      { id: 10 },
    ];
    const actual = SortProjectsById(projects);
    expect(actual).toEqual(expected);
  });
});
