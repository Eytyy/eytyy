/* eslint no-console:off */
import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { SortProjectsById } from '../HomeHelpers';
import CloseIcon from '../icons/Close';

class ProjectsNav extends Component {
  constructor() {
    super();
    this.closeAllProjects = this.closeAllProjects.bind(this);
    this.onProjectclick = this.onProjectclick.bind(this);
    this.onHomeClick = this.onHomeClick.bind(this);
  }
  onProjectclick(event) {
    this.props.goToSection(event.target.dataset.target);
  }
  onHomeClick() {
    this.props.goToSection('home');
  }
  closeAllProjects() {
    this.props.closeProjects();
    if (document.body.width < 720) {
      window.scrollTo(0, 0);
    }
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
        data-name={project.name}
        data-target={project.id}
      >
        {project.name}
      </Link>,
    );
    return (
      <aside className="projects-nav">
        {projects.length > 0 ?
          <div className="top-links">
            <Link
              className="project-nav__item project-nav__item--link gohome"
              data-name="Hello"
              onClick={this.onHomeClick}
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
