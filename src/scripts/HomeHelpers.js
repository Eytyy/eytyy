export const updateActiveProjects = (list, project) => {
  // Index of passed project
  const projectIdx = list
    .findIndex(item => item.id === project.id);
  let newlist;
  // if project doesn't exist in the list, add it
  if (projectIdx === -1) {
    newlist = list.concat(project);
    return {
      projects: newlist,
      lastIndex: newlist.length - 1,
    };
  }
  // otherwise remove it
  newlist = list.slice(0, projectIdx).concat(list.slice(projectIdx + 1, list.length));
  return {
    projects: newlist,
    lastIndex: newlist.length === 0 ? -1 : projectIdx - 1,
  };
};

export const getProjectOnScrollPosition = (list, positions) => {
  const isItnearTop = positions.scrollPosition < positions.workTextOffsetHeight;

  if (!list || isItnearTop) {
    return 'Hello';
  }

  const finalPosition = positions.scrollPosition + positions.mainOffsetTop
  + positions.workTextOffsetTop;

  const condition = project =>
    (finalPosition >= project.offset && finalPosition <= project.offset + project.height);

  const project = list.filter(item => condition(item))[0];
  if (project) {
    return project.title;
  }
  return undefined;
};

const compare = (a, b) => (parseInt(a.id, 10) > parseInt(b.id, 10) ? 1 : -1);

export const SortProjectsById = list => list.sort(compare);
