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
      playing: !this.state.playing,
    });
    this.props.videoEvent(false);
  }
  playImages() {
    const scrollPosition = this.image.parentNode.parentNode.parentNode.offsetTop +
      document.querySelector('.main-header').offsetTop;
    window.scrollTo(0, scrollPosition);
    const images = this.props.images;
    let count = 0;
    this.timer = setInterval(() => {
      this.image.style.backgroundImage = `url(./images/projects/${images[count]})`;
      if (count === images.length - 1) {
        count = 0;
      } else {
        count += 1;
      }
    }, 700);
    this.setState({
      playing: !this.state.playing,
    });
    this.props.videoEvent(true);
  }
  render() {
    if (this.props.images.length > 0) {
      const randomShit = Math.ceil(Math.random() * (this.props.images.length - 1));
      const divStyle = {
        backgroundImage: `url(./images/projects/${this.props.images[randomShit]})`,
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
