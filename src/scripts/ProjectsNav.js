/* eslint no-console:off */
import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { SortProjectsById } from './HomeHelpers';
import CloseIcon from './icons/Close';

class ProjectsNav extends Component {
  constructor() {
    super();
    this.closeAllProjects = this.closeAllProjects.bind(this);
    this.onProjectclick = this.onProjectclick.bind(this);
  }
  onProjectclick(event) {
    this.props.goToSection(event.target.dataset.target);
  }
  closeAllProjects() {
    this.props.closeProjects();
  }
  render() {
    const projects = SortProjectsById(this.props.projects.slice());
    const listOfProjects = projects.map(project =>
      <Link
        className={project.onFocus ?
        'js-active project-nav__item project-nav__item--link' :
        'project-nav__item project-nav__item--link'}
        onClick={this.onProjectclick}
        key={project.id}
        data-name={project.title}
        data-target={project.id}
      >
        {project.title}
      </Link>,
    );
    return (
      <aside className="projects-nav">
        {projects.length > 0 ?
          <div className="top-links">
            <Link
              className="project-nav__item project-nav__item--link gohome"
              onClick={this.onProjectclick}
            />
            <Link
              className="project-nav__item project-nav__item--icon close-projects"
              onClick={this.closeAllProjects}
              data-name="close projects"
            ><CloseIcon /></Link>
          </div> : null}
        {listOfProjects}
      </aside>
    );
  }
}

ProjectsNav.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.object),
  closeProjects: PropTypes.func.isRequired,
  goToSection: PropTypes.func.isRequired,
};

ProjectsNav.defaultProps = {
  projects: [],
};

export default ProjectsNav;
