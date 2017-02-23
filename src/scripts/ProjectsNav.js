import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { SortProjectsById } from './HomeHelpers';

const ProjectsNav = (props) => {
  const projects = SortProjectsById(props.projects.slice());
  const onProjectclick = (event) => {
    console.log(event);
  };
  const listOfProjects = projects.map(project =>
    <Link
      className={project.onFocus ? 'js-active project-nav__link' : 'project-nav__link'}
      onClick={onProjectclick}
      key={project.id}
      data-name={project.title}
    >
      {project.title}
    </Link>,
  );
  return (
    <aside className="projects-nav">
      {listOfProjects}
    </aside>
  );
};

ProjectsNav.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.object),
};

ProjectsNav.defaultProps = {
  projects: [],
};

export default ProjectsNav;
