/* eslint no-console:off */

import React, { Component, PropTypes } from 'react';

class ProjectImages extends Component {
  constructor() {
    super();
    this.playImages = this.playImages.bind(this);
    this.stopPlaying = this.stopPlaying.bind(this);
    this.onClickImages = this.onClickImages.bind(this);
    this.state = {
      playing: false,
    };
    this.timer = null;
  }
  componentWillUnmount() {
    this.stopPlaying();
  }
  onClickImages() {
    if (this.state.playing === false) {
      this.playImages();
    } else {
      this.stopPlaying();
    }
  }
  stopPlaying() {
    clearInterval(this.timer);
    this.setState({
      playing: false,
    });
  }
  playImages() {
    const images = this.props.images;
    let count = 0;
    this.timer = setInterval(() => {
      this.image.style.backgroundImage = `url(./images/projects/${images[count]})`;
      count = count === images.length - 1 ? 0 : count + 1;
    }, 100);
    this.setState({
      playing: true,
    });
  }

  render() {
    if (this.props.images.length > 0) {
      const divStyle = {
        backgroundImage: `url(./images/projects/${this.props.images[0]})`,
      };
      return (<div className="project-bottom__section">
        <div className="c-project__images">
          <div className="yo" ref={(img) => { this.image = img; }} onClick={this.onClickImages} style={divStyle} />
        </div>
      </div>);
    }
    return null;
  }
}

export default ProjectImages;

ProjectImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
};

ProjectImages.defaultProps = {
  images: [],
};
