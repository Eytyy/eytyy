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

const FirstParagraphText = props => (
  <section className="section section--work">
    <header className="section__header"><h2 className="section__title">work</h2></header>
    <p className="work-text">If you are here to check my work, here are a few that found their way to the Internet:</p>
    <ul className="section__list projects-list">{ props.projects }</ul>
  </section>
);

const SecondParagraphText = props => (
  <p>If you’d like to <span className="anchor anchor--contact">catch up</span>,
  drop me an {<a className="contact-link" href={`mailto:${props.email}`}>email</a>}{' '}
   or pass by the {<a className="contact-link" href={props.location}>office</a>}{' '}
   and have a cup of coffee from Abu Ibrahim (the street coffee shop next door).
   Unless, of course, {"you're"} visiting with a pocket full of $$$, then a sexy
  Nespresso machine is waiting for you.</p>);
  
export default Content;
