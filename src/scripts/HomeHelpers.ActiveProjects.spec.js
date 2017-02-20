import expect from 'expect';
import { updateActiveProjects } from './HomeHelpers';

describe('Update active projects', () => {
  describe('update active projects when array size is 1', () => {
    let projects;
    let project;
    beforeEach(() => {
      projects = [
        {
          id: 1,
          title: 'turbo',
          state: false,
          element: '',
          offset: 0,
          height: 0,
        },
      ];
      project = {
        id: 2,
        title: 'welfare',
        state: false,
        element: '',
        offset: 0,
        height: 0,
      };
    });
    it('should add project to list of active projects', () => {
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
      const actual = updateActiveProjects(projects, project).projects;
      expect(actual).toEqual(expected);
    });
    it('should return the index to be 1', () => {
      const actual = updateActiveProjects(projects, project).lastIndex;
      const expected = 1;
      expect(actual).toEqual(expected);
    });
  });
  describe('update active projects when array is empty', () => {
    let projects;
    let project;
    beforeEach(() => {
      projects = [];
      project = {
        id: 2,
        title: 'welfare',
        state: false,
        element: '',
        offset: 0,
        height: 0,
      };
    });
    it('should add project to list of active projects', () => {
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
      const actual = updateActiveProjects(projects, project).projects;
      expect(actual).toEqual(expected);
    });
    it('should return the index to be 0', () => {
      const actual = updateActiveProjects(projects, project).lastIndex;
      const expected = 0;
      expect(actual).toEqual(expected);
    });
  });
  describe('update active projects when array size is 1, and the passed project already exists', () => {
    let projects;
    let project;
    beforeEach(() => {
      projects = [
        {
          id: 1,
          title: 'turbo',
          state: false,
          element: '',
          offset: 0,
          height: 0,
        },
      ];
      project = {
        id: 1,
        title: 'turbo',
        state: false,
        element: '',
        offset: 0,
        height: 0,
      };
    });
    it('should return empty array', () => {
      const actual = updateActiveProjects(projects, project).projects;
      const expected = [];
      expect(actual).toEqual(expected);
    });
    it('should return the index to be -1', () => {
      const actual = updateActiveProjects(projects, project).lastIndex;
      const expected = -1;
      expect(actual).toEqual(expected);
    });
  });
  describe('update active projects when array size is more than one, and the passed project already exists', () => {
    let projects;
    beforeEach(() => {
      projects = [
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
    });
    it('should remove project from list of active projects, and return project with id 2', () => {
      const project = {
        id: 1,
        title: 'turbo',
        state: false,
        element: '',
        offset: 0,
        height: 0,
      };
      const actualLength = updateActiveProjects(projects, project).projects.length;
      const expectedLength = 1;
      expect(actualLength).toEqual(expectedLength);

      const actual = updateActiveProjects(projects, project).projects[0].id;
      const expected = 2;
      expect(actual).toEqual(expected);
    });
    it('should remove project from list of active projects, and return project with id 1', () => {
      const project = {
        id: 2,
        title: 'welfare',
        state: false,
        element: '',
        offset: 0,
        height: 0,
      };
      const actualLength = updateActiveProjects(projects, project).projects.length;
      const expectedLength = 1;
      expect(actualLength).toEqual(expectedLength);

      const actual = updateActiveProjects(projects, project).projects[0].id;
      const expected = 1;
      expect(actual).toEqual(expected);
    });
  });
});


