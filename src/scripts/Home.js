import React, { Component, PropTypes } from 'react';
import { updateActiveProjects } from './HomeHelpers';
import Header from './Header';
import Content from './Content';


class Home extends Component {
  constructor() {
    super();
    this.state = {
      title: 'friend',
      projects: [],
      activeProjects: [],
    };
    this.updateUI = this.updateUI.bind(this);
  }
  componentDidMount() {
    fetch('../data/projects.json')
      .then(response => (response.json()))
      .then((data) => {
        this.setState({
          projects: data,
        });
      });
  }
  updateUI(project) {
    const activeProjects = updateActiveProjects(this.state.activeProjects, project);
    const title = activeProjects.length > 0 ? project.title : 'friend';
    // update projects offsets
    activeProjects.forEach((item) => {
      const el = item.element;
      const offset = el.offsetTop;
      Object.assign(item, {
        offset,
        offsetHeight: offset + el.offsetHeight + 40,
      });
    });
    this.setState({
      activeProjects,
      title,
    });
  }
  render() {
    return (
      <div className="inner-wrapper">
        <Header title={this.state.title} />
        <Content projects={this.state.projects} updateUI={this.updateUI} />
      </div>
    );
  }
}

export default Home;
