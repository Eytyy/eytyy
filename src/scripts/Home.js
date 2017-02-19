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
  render() {
    return (
      <div className="inner-wrapper">
        <Header />
        <Content projects={this.state.projects} />
      </div>
    );
  }
}

export default Home;