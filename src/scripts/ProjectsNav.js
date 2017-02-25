/* eslint no-console:off */
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { SortProjectsById } from './HomeHelpers';
import CloseIcon from './icons/Close';

const ProjectsNav = (props) => {
  const projects = SortProjectsById(props.projects.slice());
  const onProjectclick = () => {
    console.log('clicked project');
  };
  const closeAllProjects = () => {
    console.log('clicked close projects');
  };
  const listOfProjects = projects.map(project =>
    <Link
      className={project.onFocus ?
      'js-active project-nav__item project-nav__item--link' :
      'project-nav__item project-nav__item--link'}
      onClick={onProjectclick}
      key={project.id}
      data-name={project.title}
    >
      {project.title}
    </Link>,
  );
  return (
    <aside className="projects-nav">
      {projects.length > 0 ?
        <Link
          className="project-nav__item project-nav__item--icon close-projects"
          onClick={closeAllProjects}
          data-name="close projects"
        ><CloseIcon /></Link> : null}
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
