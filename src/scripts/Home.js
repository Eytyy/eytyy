import React, { Component } from 'react';
import { updateActiveProjects, getProjectOnScrollPosition } from './HomeHelpers';
import Header from './Header';
import Content from './Content';


class Home extends Component {
  constructor() {
    super();
    this.state = {
      title: 'friend',
      projects: [],
      email: 'e.tayyem@gmail.com',
      location: 'https://www.google.jo/maps/place/eyen/@31.9539943,35.9228223,17z/data=!3m1!4b1!4m5!3m4!1s0x151b5f85a31cc537:0x90ec889a5658704!8m2!3d31.9539943!4d35.9228223"',
      activeProjects: [],
    };
    this.dom = {
      $header: null,
      $content: null,
    };
    this.scroll = false;
    this.updateUI = this.updateUI.bind(this);
    this.updateTitle = this.updateTitle.bind(this);
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
    this.dom.$content.style.paddingTop = `${headerHeight}px`;
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
    const { projects: activeProjects } = updateActiveProjects(this.state.activeProjects, project);
    const { lastIndex } = updateActiveProjects(this.state.activeProjects, project);
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
    });
    this.updateTitle(lastIndex);
    // scroll to section
    const scrollpos = lastIndex === -1 ? 0 : activeProjects[lastIndex].offset - document.querySelector('.main-header').offsetHeight;
    window.scrollTo(0, scrollpos);
  }
  updateTitle(lastIndex) {
    const title = lastIndex === -1 ? 'friend' : this.state.activeProjects[lastIndex].title;
    this.setState({
      title,
    });
  }
  render() {
    return (
      <div className="inner-wrapper">
        <Header title={this.state.title} />
        <Content
          projects={this.state.projects}
          updateUI={this.updateUI}
          email={this.state.email}
          location={this.state.location}
        />
      </div>
    );
  }
}

export default Home;
