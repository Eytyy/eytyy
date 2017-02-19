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
  <p>If you are here to check my {<span className="anchor anchor--work">work</span>},
  here are a few that found their way to the Internet:{ props.projects }</p>
);

const SecondParagraphText = props => (
  <p>If you’d like to <span className="anchor anchor--contact">catch up</span>,
  drop me an {<a className="contact-link" href={`mailto:${props.email}`}>email</a>}{' '}
   or pass by the {<a className="contact-link" href={props.location}>office</a>}{' '}
   and have a cup of coffee from Abu Ibrahim (the street coffee shop next door).
   Unless, of course, {"you're"} visiting with a pocket full of $$$, then a sexy
  Nespresso machine is waiting for you.</p>);
  
export default Content;
