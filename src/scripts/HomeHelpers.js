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
