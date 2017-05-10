import React, { PropTypes } from 'react';
import Project from './Project';

const Projects = props => <Project
  data={props.project}
  updateUI={props.updateUI}
  inTransition={props.inTransition}
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
  inTransition: PropTypes.bool.isRequired,
};

Projects.defaultProps = {
  project: {},
};

export default Projects;
