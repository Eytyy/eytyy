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
    this.dom = {
      $header: null,
      $content: null,
    };
    this.scroll = false;
    this.updateUI = this.updateUI.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.onResize = this.onResize.bind(this);
  }
  componentDidMount() {
    // fetch projects and update state
    fetch('../data/projects.json')
      .then(response => (response.json()))
      .then((data) => {
        this.setState({
          projects: data,
        });
      });
    // cache dom element for reference
    this.dom.$header = document.querySelector('.main-header');
    this.dom.$content = document.querySelector('.content');
    // listen to scroll events
    window.addEventListener('scroll', this.onScroll);
    window.addEventListener('resize', this.onResize);
    // initial content padding
    this.dom.$content.style.paddingTop = `${this.dom.$header.offsetHeight}px`;
  }
  // adjust content padding depnding on header height on window resize
  onResize() {
    const headerHeight = this.dom.$header.offsetHeight;
    this.dom.$content.style.paddingTop = headerHeight;
  }
  // Update page title depending on window scroll position
  onScroll() {
    if (!this.scroll) {
      this.scroll = true;
      setTimeout(() => {
        const scrollPos = window.scrollY
          + document.querySelector('main').offsetTop
          + document.querySelector('.work-text').offsetTop;
        const activeSection = getProjectOnScrollPosition(this.state.activeProjects, scrollPos);
        // update title
        this.setState({
          title: activeSection,
        });
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
        height: el.offsetHeight + 40,
      });
    });
    // update the state
    this.setState({
      activeProjects,
      title,
    });
    // scroll to section
    console.log(project.title);
    const scrollpos = project.offset
      - document.querySelector('main').offsetTop
      - document.querySelector('.work-text').offsetTop;

    window.scrollTo(0, scrollpos);
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
