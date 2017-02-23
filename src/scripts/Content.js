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
    <p className="work-text">If you are here to check my work, here are a few that found
      {' '}their way to the Internet:</p>
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
    <p>If you’d like to <span className="anchor anchor--contact">catch up</span>,
  drop me an {<a className="contact-link" href={`mailto:${props.email}`}>email</a>}{' '}
   or pass by the {<a className="contact-link" href={props.location}>office</a>}{' '}
   and have a cup of coffee from Abu Ibrahim (the street coffee shop next door).
   Unless, of course, {"you're"} visiting with a pocket full of $$$, then a sexy
  Nespresso machine is waiting for you.</p>
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
