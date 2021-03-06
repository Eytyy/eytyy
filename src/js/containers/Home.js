import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { updateActiveProjects, getProjectOnScrollPosition } from '../HomeHelpers';
import Header from '../components/Header';
import Work from '../components/Work';
import Contact from '../components/Contact';
import Nav from './Nav';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      title: 'Hello',
      projects: [],
      email: 'e.tayyem@gmail.com',
      location: 'https://www.google.jo/maps/place/eyen/@31.9539943,35.9228223,17z/data=!3m1!4b1!4m5!3m4!1s0x151b5f85a31cc537:0x90ec889a5658704!8m2!3d31.9539943!4d35.9228223"',
      activeProjects: [],
      projectInTransition: false,
    };
    this.dom = {
      $header: null,
      $content: null,
      $main: null,
      $nav: null,
    };
    this.scroll = false;
    this.updateDOM = this.updateDOM.bind(this);
    this.registerEvents = this.registerEvents.bind(this);
    this.closeProjects = this.closeProjects.bind(this);
    this.updateProject = this.updateProject.bind(this);
    this.updateUI = this.updateUI.bind(this);
    this.updateTitle = this.updateTitle.bind(this);
    this.updateProjectOnFocusProp = this.updateProjectOnFocusProp.bind(this);
    this.goToSection = this.goToSection.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.onResize = this.onResize.bind(this);
    this.navigationClass = this.navigationClass.bind(this);
    this.adjustNavigationPadding = this.adjustNavigationPadding.bind(this);
  }

  componentDidMount() {
    // fetch projects and update state
    fetch('../data/projects.json')
      .then(response => (response.json()))
      .then((data) => {
        this.setState({
          projects: data,
        });
      }).then(() => {
        this.updateDOM();
        this.registerEvents();
      });
  }
  componentWillUpdate(nextProps, nextState) {
    this.navigationClass(nextState.activeProjects.length);
    this.adjustNavigationPadding();
  }
  // adjust content padding depnding on header height on window resize
  onResize() {
    const headerHeight = this.dom.$header.offsetHeight;
    this.dom.$content.style.paddingTop = `${headerHeight}px`;
    this.adjustNavigationPadding();
  }
  // Update page title depending on window scroll position
  onScroll() {
    if (!this.scroll) {
      this.scroll = true;
      setTimeout(() => {
        const positions = {
          scrollPosition: window.scrollY,
          workTextOffsetTop: document.querySelector('.work-text').offsetTop,
          workTextOffsetHeight: document.querySelector('.work-text').offsetHeight,
          mainOffsetTop: document.querySelector('main').offsetTop,
        };
        const activeSection = getProjectOnScrollPosition(this.state.activeProjects, positions);
        // only update title if active section has value
        // otherwise we'll keep the title as is.
        if (activeSection) {
          this.setState({
            title: activeSection,
          });
        }
        this.updateProjectOnFocusProp(activeSection);
        this.scroll = false;
      }, 500);
    }
  }
  adjustNavigationPadding() {
    if (this.state.activeProjects.length > 0) {
      if (document.body.clientWidth < 720) {
        const headerOffsetTop = `${this.dom.$header.offsetTop}px`;
        this.dom.$nav.style.paddingTop = `calc(${headerOffsetTop} + 1.2em)`;
      }
    }
  }
  navigationClass(activeProjectsLength) { // eslint-disable-line
    if (activeProjectsLength) {
      document.body.classList.add('js-nav-is-visible');
    } else {
      document.body.classList.remove('js-nav-is-visible');
    }
  }
  registerEvents() {
    // listen to scroll events
    window.addEventListener('scroll', this.onScroll);
    window.addEventListener('resize', this.onResize);
  }
  updateDOM() {
    // cache dom element for reference
    this.dom.$main = document.querySelector('main');
    this.dom.$header = document.querySelector('.main-header');
    this.dom.$content = document.querySelector('.content');
    this.dom.$nav = document.querySelector('.projects-nav');
    // initial styles
    this.dom.$content.style.paddingTop = `${this.dom.$header.offsetHeight}px`;
  }
  closeProjects() {
    const list = this.state.projects.map((item) => {
      const obj = {
        active: false,
      };
      return Object.assign(item, obj);
    });
    this.setState({
      projects: list,
      activeProjects: [],
    });
    window.scrollTo(0, 0);
  }
  updateProjectOnFocusProp(project) {
    if (!project) {
      return;
    }
    const activeprojects = this.state.activeProjects;
    const projects = this.state.projects;

    let updatedActiveProjects;
    let updatedProjects;

    function setFocusFalse(item) {
      return Object.assign(item, { onFocus: false });
    }

    function setFocus(item, title) {
      return (item.nameShort === title || item.name === title) ?
        Object.assign(item, { onFocus: true }) :
        Object.assign(item, { onFocus: false });
    }

    if (project === 'Hello') {
      updatedActiveProjects = activeprojects.map(setFocusFalse);
      updatedProjects = projects.map(setFocusFalse);
    } else {
      // index of project we need to update its' onFocus property
      const title = project.toString();
      // Set project that matches the index onFocus property to true
      // and rest to false
      updatedActiveProjects = activeprojects.map(item => (
        setFocus(item, title)
      ));
      updatedProjects = projects.map(item => (
        setFocus(item, title)
      ));
    }
    this.setState({
      activeProjects: updatedActiveProjects,
      projects: updatedProjects,
    });
  }
  updateProject(project) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // get then index of project that we need to update from the projects list
        const index = this.state.projects.findIndex(item => item.id === project.id);
        // update the project active state
        const newlist = this.state.projects.slice();
        newlist[index].active = newlist[index].active ? !newlist[index].active : true;
        resolve(newlist);
      }, 10);
    });
  }
  updateUI(project) {
    // update projects
    this.updateProject(project).then((projects) => {
      this.setState({
        projects,
        projectInTransition: true,
      });
    }).then(() => {
      // Then update the list of active projects
      const { projects: activeProjects, lastIndex } =
      updateActiveProjects(this.state.activeProjects, project);
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
        projectInTransition: false,
      });
      this.updateTitle(lastIndex);
      // scroll to section
      const scrollpos = lastIndex === -1 ? 0 : activeProjects[lastIndex].offset - document.querySelector('.main-header').offsetHeight;
      window.scrollTo(0, scrollpos);
    });
  }
  updateTitle(lastIndex) {
    const title = lastIndex === -1 ? 'Hello' : this.state.activeProjects[lastIndex].name;
    this.setState({
      title,
    });
  }
  goToSection(target) {
    const headerHeight = document.querySelector('.main-header').offsetHeight;
    const position = target === 'home' ?
    0 :
    this.state.activeProjects.find(project => project.id === target).offset - headerHeight;

    window.scrollTo(0, position);
  }
  render() {
    const { projects, activeProjects, projectInTransition, title } = this.state;
    const { location } = this.props;
    const doYouWantToTalk = location.pathname === '/contact' || false;
    return (
      <div className="inner-wrapper">
        <Nav
          projects={activeProjects}
          closeProjects={this.closeProjects}
          goToSection={this.goToSection}
        />
        <Header title={title} />
        <main className="content">
          <Work projects={projects} updateUI={this.updateUI} inTransition={projectInTransition} />
          <div className="section section--contact">
            {
              doYouWantToTalk ?
                <Contact /> :
                <p>
                  Want to start a new project?{' '}
                  <Link className="contact-link" to="/contact">click here</Link>
                </p>
           }
          </div>
        </main>
      </div>
    );
  }
}

export default Home;

Home.propTypes = {
  location: PropTypes.shape().isRequired,
};
