import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import ProjectImages from './ProjectImages';

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
        <ProjectDetails isVisible={this.props.data.active}>
          <ProjectDescription body={this.props.data.desc} />
          <div className="c-project__bottom">
            <ProjectImages
              videoEvent={this.props.videoEvent}
              images={this.props.data.images}
              inTransition={this.props.inTransition}
            />
            <div className="c-project__details">
              <div className="c-project__details__item c-project__year">
                <span className="label">Year:</span> {this.props.data.year}
              </div>
              <Collaborators collaborators={this.props.data.collaborators} />
              <div className="c-project__details__item c-project__links">
                <a
                  className="c-project__links__item"
                  alt={`visit ${this.props.data.name}`}
                  rel="noopener noreferrer"
                  target="_blank"
                  href={this.props.data.website}
                >
                Visit website &rarr;
                </a>
              </div>
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
    images: PropTypes.arrayOf(PropTypes.string),
    year: PropTypes.string,
    active: false,
    onFocus: false,
  }),
  updateUI: PropTypes.func,
  videoEvent: PropTypes.func.isRequired,
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

const uniqueKey = name => `${Math.ceil(Math.random() * 100)}-${name}`;

const Collaborators = (props) => {
  const list = props.collaborators ? props.collaborators.map(item => (
    <a
      className="c-project__collaborators__item"
      key={uniqueKey(item.name)} href={item.link}
    >{item.name}</a>
  )) : null;
  return (
    <div className="c-project__details__item c-project__collaborators">
      <span>Collaborators: </span>{list}
    </div>);
};

Collaborators.propTypes = {
  collaborators: PropTypes.arrayOf(PropTypes.object),
};

Collaborators.defaultProps = {
  collaborators: [],
};

const ProjectDetails = props => (
  props.isVisible ? <div className="c-project__content">{props.children}</div> : null
);

ProjectDetails.propTypes = {
  isVisible: PropTypes.bool,
};

ProjectDetails.defaultProps = {
  isVisible: false,
};

const ProjectDescription = (props) => {
  const FormattedHtml = () => ({ __html: props.body });
  return <div className="c-project__description" dangerouslySetInnerHTML={FormattedHtml()} />;
};

ProjectDescription.propTypes = {
  body: PropTypes.string,
};

ProjectDescription.defaultProps = {
  body: '',
};

export default Project;
