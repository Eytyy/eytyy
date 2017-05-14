import React, { PropTypes } from 'react';
import Project from './Project';

const Work = ({ projects, updateUI, inTransition }) => (
  <div className="section section--work">
    <p className="work-text">Let’s cut to the chase. Here is some of my recent work: </p>
    <ul className="section__list projects-list">
      {
        projects.map(project =>
          <Project
            key={project.id}
            project={project}
            updateUI={updateUI}
            inTransition={inTransition}
          />,
        )
      }
    </ul>
  </div>
);

export default Work;

Work.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.object).isRequired,
  updateUI: PropTypes.func.isRequired,
  inTransition: PropTypes.bool.isRequired,
};
