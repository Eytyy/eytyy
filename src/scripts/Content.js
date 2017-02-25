import React, { PropTypes } from 'react';
import Projects from './Projects';

const Content = (props) => {
  const ListOfProjects = props.projects.map(project => (
    <Projects key={project.id} last="no" project={project} updateUI={props.updateUI} />));
  return (
    <div className="content">
      <FirstParagraphText projects={ListOfProjects} />
      <SecondParagraphText email={props.email} location={props.location} />
    </div>
  );
};

Content.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.object),
  email: PropTypes.string,
  location: PropTypes.string,
  updateUI: PropTypes.func,
};

Content.defaultProps = {
  projects: [],
  email: '',
  location: '',
  updateUI: PropTypes.func,
};

const FirstParagraphText = props => (
  <div className="section section--work">
    <p className="work-text">Let’s cut through the buzzword jargon bullshit. Here is my work: </p>
    <ul className="section__list projects-list">{ props.projects }</ul>
  </div>
);

FirstParagraphText.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.object),
};

FirstParagraphText.defaultProps = {
  projects: [],
};

const SecondParagraphText = props => (
  <div className="section section--contact">
    <p>Here’s how you can find me:<br />
      Virtually on my{' '}
      {<a className="contact-link" href={`mailto:${props.email}`}>Email</a>}.
      Please don’t spam.<br />
      IRL at {<a className="contact-link" href={props.location}>Eyen</a>}.{' '}
      Also, don’t spam.
    </p>
  </div>);

SecondParagraphText.propTypes = {
  email: PropTypes.string,
  location: PropTypes.string,
};

SecondParagraphText.defaultProps = {
  email: '',
  location: '',
};

export default Content;
