import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import ProjectDetails from './ProjectDetails';

class Project extends Component {
  constructor() {
    super();
    this.onProjectClick = this.onProjectClick.bind(this);
  }
  onProjectClick(event) {
    const { updateUI, project } = this.props;
    const target = event.target.parentNode;
    const projectDetails = {
      id: project.id,
      name: project.nameShort,
      element: target,
      height: target.offsetHeight,
      offset: target.offsetTop,
    };
    updateUI(projectDetails);
  }
  render() {
    const { project, inTransition } = this.props;
    const isActive = (project.active && project.active) || false;
    const isOnFocus = (project.onFocus && project.onFocus) || false;
    const activeClass = isActive ? 'c-project--active' : '';
    const focusClass = isOnFocus ? 'c-project--inFocus' : '';
    return (
      <span className={`c-project ${activeClass} ${focusClass}`}>
        <Link onClick={this.onProjectClick} className="c-project__link">
          { project.name }
        </Link>
        <ProjectDetails {...project} inTransition={inTransition} />
      </span>
    );
  }
}

Project.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    nameShort: PropTypes.string,
    desc: PropTypes.string,
    url: PropTypes.string,
    website: PropTypes.string,
    collaborators: PropTypes.arrayOf(PropTypes.object),
    media: PropTypes.shape({
      type: PropTypes.string,
      images: PropTypes.array,
    }),
    year: PropTypes.string,
    active: false,
    onFocus: false,
  }).isRequired,
  updateUI: PropTypes.func.isRequired,
  inTransition: PropTypes.bool.isRequired,
};

Project.defaultProps = {
  isVisible: false,
};

export default Project;
