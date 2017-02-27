import React, { PropTypes } from 'react';
import Project from './Project';

const Projects = props => <Project
  videoEvent={props.videoEvent}
  data={props.project}
  updateUI={props.updateUI}
/>;

Projects.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    url: PropTypes.string,
    desc: PropTypes.string,
    website: PropTypes.string,
  }),
  updateUI: PropTypes.func.isRequired,
  videoEvent: PropTypes.func.isRequired,
};

Projects.defaultProps = {
  project: {},
};

export default Projects;
