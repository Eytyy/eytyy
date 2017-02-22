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

export const getProjectOnScrollPosition = (list) => {
  if (!list) {
    return 'friend';
  }
  const mainOffsetTop = document.querySelector('main').offsetTop;
  const workTextOffsetTop = document.querySelector('.work-text');
  const scrollPosition = window.scrollY + mainOffsetTop + workTextOffsetTop.offsetTop;
  const isItnearTop = window.scrollY < workTextOffsetTop.offsetHeight;

  const condition = project =>
    (scrollPosition >= project.offset && scrollPosition <= project.offset + project.height);

  const project = list.filter(item => condition(item))[0];
  if (project) {
    return project.title;
  } else if (isItnearTop) {
    return 'friend';
  }
  return undefined;
};
