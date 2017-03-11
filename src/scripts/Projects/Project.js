import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import ProjectDetails from './ProjectDetails';

class Project extends Component {
  constructor() {
    super();
    this.onProjectClick = this.onProjectClick.bind(this);
  }
  onProjectClick(event) {
    const target = event.target.parentNode;
    const project = {
      id: this.props.data.id,
      name: this.props.data.nameShort,
      element: target,
      height: target.offsetHeight,
      offset: target.offsetTop,
    };
    // update active state; will affect visibility of project description.

    // call parent component method updateUI and pass the clicked project info object.
    // use timeout to give the element time to expand it's height before updating the values
    this.props.updateUI(project);
  }
  render() {
    const isActive = (this.props.data.active && this.props.data.active) || false;
    const onFocus = (this.props.data.onFocus && this.props.data.onFocus) || false;
    const activeClass = isActive ? 'c-project--active' : '';
    const focusClass = onFocus ? 'c-project--inFocus' : '';
    return (
      <span
        className={`c-project ${activeClass} ${focusClass}`}
      >
        <Link
          onClick={this.onProjectClick}
          className="c-project__link"
        >
          { this.props.data.name }
        </Link>
        <ProjectDetails
          data={this.props.data}
          inTransition={this.props.inTransition}
        />
      </span>
    );
  }
}

Project.propTypes = {
  data: PropTypes.shape({
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
  }),
  updateUI: PropTypes.func,
  inTransition: PropTypes.bool.isRequired,
};

Project.defaultProps = {
  data: {},
  updateUI: PropTypes.func,
  active: false,
};

Project.defaultProps = {
  isVisible: false,
};

export default Project;
