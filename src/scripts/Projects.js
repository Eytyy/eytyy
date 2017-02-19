import React, { PropTypes } from 'react';
import Project from './Project';

const Projects = props => <Project data={props.project} updateUI={props.updateUI} />;

Projects.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    url: PropTypes.string,
    desc: PropTypes.string,
    website: PropTypes.string,
  }),
  updateUI: PropTypes.func,
};

Projects.defaultProps = {
  project: {},
  updateUI: PropTypes.func,
};

export default Projects;
