import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import Eye from './icons/Eye';

class Project extends Component {
  constructor() {
    super();
    this.onProjectClick = this.onProjectClick.bind(this);
  }
  onProjectClick(event) {
    const target = event.target.parentNode;
    const project = {
      id: this.props.data.id,
      title: this.props.data.nameShort,
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
    return (
      <span
        className={isActive ?
        `c-project c-project--active c-project--${this.props.data.nameShort.toLowerCase()}` :
        `c-project c-project--${this.props.data.nameShort.toLowerCase()}`}
      >
        <Link
          onClick={this.onProjectClick}
          className="project-link"
        >
          { this.props.data.name }
        </Link>
        <ProjectDetails isVisible={this.props.data.active}>
          <ProjectDescription body={this.props.data.desc} />
          <div className="project-bottom">
            <Collaborators collaborators={this.props.data.collaborators} />
            <div className="project-links">
              <a className="project-links__item project-links__item--website" alt={`visit ${this.props.data.name}`} rel="noopener noreferrer" target="_blank" href={this.props.data.website}>
                <Eye />
              </a>
            </div>
          </div>
        </ProjectDetails>
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
    active: false,
  }),
  updateUI: PropTypes.func,
};

Project.defaultProps = {
  data: {},
  updateUI: PropTypes.func,
  active: false,
};

Project.defaultProps = {
  isVisible: false,
};

const uniqueKey = name => `${Math.ceil(Math.random() * 100)}-${name}`;

const Collaborators = (props) => {
  const list = props.collaborators ? props.collaborators.map(item => (
    <a className="collaborator" key={uniqueKey(item.name)} href={item.link}>{item.name}</a>
  )) : null;
  return <div className="project-collaborators"><span>Collaborators: </span>{list}</div>;
};

Collaborators.propTypes = {
  collaborators: PropTypes.arrayOf(PropTypes.object),
};

Collaborators.defaultProps = {
  collaborators: [],
};

const ProjectDetails = props => (
  props.isVisible ? <div className="project-details">{props.children}</div> : null
);

ProjectDetails.propTypes = {
  isVisible: PropTypes.bool,
};

ProjectDetails.defaultProps = {
  isVisible: false,
};

const ProjectDescription = (props) => {
  const FormattedHtml = () => ({ __html: props.body });
  return <div className="project-description" dangerouslySetInnerHTML={FormattedHtml()} />;
};

ProjectDescription.propTypes = {
  body: PropTypes.string,
};

ProjectDescription.defaultProps = {
  body: '',
};

export default Project;
