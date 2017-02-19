import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';

class Project extends Component {
  constructor() {
    super();
    this.state = {
      active: false,
    };
  }
  onProjectClick(event) {
  }
  render() {
    return (
      <span
        className={this.state.active ?
        `c-project c-project--active c-project--${this.props.data.nameShort.toLowerCase()}` :
        `c-project c-project--${this.props.data.nameShort.toLowerCase()}`}
      >
        <Link
          onClick={this.onProjectClick}
          className="project-link"
        >
          { this.props.data.name }
        </Link><ProjectDescription isVisible={this.state.active} body={this.props.data.desc} />,
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
  }),
  updateUI: PropTypes.func,
};

Project.defaultProps = {
  data: {},
  updateUI: PropTypes.func,
};

const ProjectDescription = (props) => {
  const FormattedHtml = () => ({ __html: props.body });

  return props.isVisible ?
    <span className="project-details" dangerouslySetInnerHTML={FormattedHtml()} /> :
    null;
};

ProjectDescription.propTypes = {
  isVisible: PropTypes.bool,
  body: PropTypes.string,
};
ProjectDescription.defaultProps = {
  isVisible: false,
  body: '',
};

export default Project;
