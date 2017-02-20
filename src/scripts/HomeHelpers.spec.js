import expect from 'expect';
import { updateActiveProjects } from './HomeHelpers';

describe('Update active projects', () => {
  it('should add project to list of active projects', () => {
    const projects = [
      {
        id: 1,
        title: 'turbo',
        state: false,
        element: '',
        offset: 0,
        height: 0,
      },
    ];
    const project = {
      id: 2,
      title: 'welfare',
      state: false,
      element: '',
      offset: 0,
      height: 0,
    };
    const expected = [
      {
        id: 1,
        title: 'turbo',
        state: false,
        element: '',
        offset: 0,
        height: 0,
      },
      {
        id: 2,
        title: 'welfare',
        state: false,
        element: '',
        offset: 0,
        height: 0,
      },
    ];
    const actual = updateActiveProjects(projects, project);
    expect(actual).toEqual(expected);
  });
  it('should add project to list of active projects', () => {
    const projects = [];
    const project = {
      id: 2,
      title: 'welfare',
      state: false,
      element: '',
      offset: 0,
      height: 0,
    };
    const expected = [
      {
        id: 2,
        title: 'welfare',
        state: false,
        element: '',
        offset: 0,
        height: 0,
      },
    ];
    const actual = updateActiveProjects(projects, project);
    expect(actual).toEqual(expected);
  });
  it('should return empty array if list length is 1, and the passed project exists in the array', () => {
    const projects = [
      {
        id: 1,
        title: 'turbo',
        state: false,
        element: '',
        offset: 0,
        height: 0,
      },
    ];
    const project = {
      id: 1,
      title: 'turbo',
      state: false,
      element: '',
      offset: 0,
      height: 0,
    };
    const actual = updateActiveProjects(projects, project);
    const expected = [];
    expect(actual).toEqual(expected);
  });
  it('should remove project from list of active projects', () => {
    const projects = [
      {
        id: 1,
        title: 'turbo',
        state: false,
        element: '',
        offset: 0,
        height: 0,
      },
      {
        id: 2,
        title: 'welfare',
        state: false,
        element: '',
        offset: 0,
        height: 0,
      },
    ];
    const project = {
      id: 1,
      title: 'turbo',
      state: false,
      element: '',
      offset: 0,
      height: 0,
    };
    const actual = updateActiveProjects(projects, project);
    const expected = [{
      id: 2,
      title: 'welfare',
      state: false,
      element: '',
      offset: 0,
      height: 0,
    }];
    expect(actual).toEqual(expected);
  });
  it('should remove project from list of active projects', () => {
    const projects = [
      {
        id: 1,
        title: 'turbo',
        state: false,
        element: '',
        offset: 0,
        height: 0,
      },
      {
        id: 2,
        title: 'welfare',
        state: false,
        element: '',
        offset: 0,
        height: 0,
      },
    ];
    const project = {
      id: 2,
      title: 'welfare',
      state: false,
      element: '',
      offset: 0,
      height: 0,
    };
    const actual = updateActiveProjects(projects, project);
    const expected = [{
      id: 1,
      title: 'turbo',
      state: false,
      element: '',
      offset: 0,
      height: 0,
    }];
    expect(actual).toEqual(expected);
  });
});
