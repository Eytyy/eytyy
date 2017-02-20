import React, { Component, PropTypes } from 'react';
import { updateActiveProjects, getProjectOnScrollPosition } from './HomeHelpers';
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
    this.scroll = false;
    this.updateUI = this.updateUI.bind(this);
    this.onScroll = this.onScroll.bind(this);
  }
  componentDidMount() {
    fetch('../data/projects.json')
      .then(response => (response.json()))
      .then((data) => {
        this.setState({
          projects: data,
        });
      });
    window.addEventListener('scroll', this.onScroll);
  }
  onScroll() {
    if (!this.scroll) {
      this.scroll = true;
      setTimeout(() => {
        const activeSection = getProjectOnScrollPosition(this.state.activeProjects, window.scrollY);
        console.log(activeSection);
        this.scroll = false;
      }, 500);
    }
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
    // update the state
    this.setState({
      activeProjects,
      title,
    });
    console.log(activeProjects);
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
