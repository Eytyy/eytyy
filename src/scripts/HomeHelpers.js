export const updateActiveProjects = (list, project) => {
  // Index of passed project
  const projectIdx = list
    .findIndex(item => item.id === project.id);

  // if project doesn't exist in the list, add it
  if (projectIdx === -1) {
    return list.concat(project);
  }
  // otherwise remove it
  return list.slice(0, projectIdx).concat(list.slice(projectIdx + 1, list.length));
};

export const getProjectOnScrollPosition = (list, scrollPosition) => {
  if (!list) {
    return 'friend';
  }
  const condition = project =>
    (scrollPosition >= project.offset && scrollPosition <= project.offset + project.offsetHeight);
  const project = list.filter(item => condition(item))[0];
  return project ? project.title : 'friend';
};
