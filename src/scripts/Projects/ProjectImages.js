/* eslint no-console:off */
import React, { Component, PropTypes } from 'react';

class ProjectImages extends Component {
  constructor() {
    super();
    this.playImages = this.playImages.bind(this);
    this.stopPlaying = this.stopPlaying.bind(this);
    this.state = {
      playing: false,
    };
    this.initialSlide = null;
    this.timer = null;
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.inTransition) {
      this.stopPlaying();
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    return nextState.playing !== this.state.playing;
  }
  componentWillUnmount() {
    this.stopPlaying();
    window.removeEventListener('scroll', this.onScroll);
  }
  stopPlaying() {
    clearInterval(this.timer);
    this.setState({
      playing: false,
    });
    this.props.videoEvent(false);
  }
  playImages() {
    const images = this.props.images;
    const imagesContainerOffset = this.image.parentNode.parentNode.parentNode.offsetTop;
    const mainHeaderOffset = document.querySelector('.main-header').offsetTop;
    const scrollPosition = imagesContainerOffset + mainHeaderOffset;

    let count = 0;

    window.scrollTo(0, scrollPosition);

    this.timer = setInterval(() => {
      this.image.style.backgroundImage = `url(./images/${images[count]})`;
      if (count === images.length - 1) {
        count = 0;
      } else {
        count += 1;
      }
      this.initialSlide = count;
    }, 1000);
    this.setState({
      playing: !this.state.playing,
    });
    this.props.videoEvent(true);
  }
  render() {
    if (this.props.images.length > 0) {
      const randomShit = this.initialSlide ?
        this.initialSlide :
        Math.ceil(Math.random() * (this.props.images.length - 1));
      const divStyle = {
        backgroundImage: `url(./images/${this.props.images[randomShit]})`,
      };
      const button = this.state.playing ?
        (<button className="images-button images-button--pause" onClick={this.stopPlaying}>
          <i className="icon icon__player icon__player--pause">
            <span className="glyph" /><span className="glyph" />
          </i>
        </button>) :
        (<button className="images-button images-button--play" onClick={this.playImages}>
          <i className="icon icon__player icon__player--play"><span className="glyph" /></i>
        </button>);

      return (<div className={this.state.playing ? 'c-project__images c-project__images--playing' : 'c-project__images'}>
        <div
          className="c-project__images__giffy"
          ref={(img) => { this.image = img; }}
          style={divStyle}
        />
        {button}
      </div>);
    }
    return null;
  }
}

export default ProjectImages;

ProjectImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
  videoEvent: PropTypes.func.isRequired,
};

ProjectImages.defaultProps = {
  images: [],
};
