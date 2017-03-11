/* eslint no-console:off */
import React, { Component, PropTypes } from 'react';
import CloseIcon from '../icons/Close';

class ProjectDetailsGiffy extends Component {
  constructor() {
    super();
    this.playImages = this.playImages.bind(this);
    this.stopPlaying = this.stopPlaying.bind(this);
    this.pausePlaying = this.pausePlaying.bind(this);
    this.nextSlide = this.nextSlide.bind(this);
    this.prevSlide = this.prevSlide.bind(this);
    this.state = {
      playing: false,
    };
    this.activeSlide = null;
    this.initialSlide = null;
    this.timer = null;
    this.noOfSlides = 0;
  }
  componentDidMount() {
    this.noOfSlides = this.props.images.length;
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
  setSlide(slide) {
    const images = this.props.images;
    this.image.style.backgroundImage = `url(./images/${images[slide]})`;
    this.activeSlide = slide;
  }
  nextSlide() {
    const slide = this.activeSlide >= this.noOfSlides - 1 ? 0 : this.activeSlide + 1;
    if (this.state.playing) this.pausePlaying();

    this.setSlide(slide);
  }
  prevSlide() {
    const slide = this.activeSlide === 0 ? this.noOfSlides - 1 : this.activeSlide - 1;

    if (this.state.playing) this.pausePlaying();

    this.setSlide(slide);
  }
  pausePlaying() {
    clearInterval(this.timer);
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
      this.setSlide(count);
      count = count === images.length - 1 ? 0 : count + 1;
    }, 1000);

    this.setState({
      playing: !this.state.playing,
    });

    this.props.videoEvent(true);
  }
  render() {
    const position = this.state.playing ?
      document.querySelector('.projects-nav').clientHeight :
      0;
    const style = {
      top: `${position}px`,
    };

    if (this.props.images.length > 0) {
      const randomShit = this.initialSlide ?
        this.initialSlide :
        Math.ceil(Math.random() * (this.props.images.length - 1));
      const divStyle = {
        backgroundImage: `url(./images/${this.props.images[randomShit]})`,
      };
      const buttons = this.state.playing ?
        (<div className="giffy-controls giffy-controls--playing" style={style}>
          <button className="images-button images-button--stop" onClick={this.stopPlaying}>
            <i className="icon icon__player icon__player--stop">
              <CloseIcon />
            </i>
          </button>
          <button className="images-button images-button--back" onClick={this.prevSlide}>
            <i className="icon icon__player icon__player--back">
              <span className="glyph" />
            </i>
          </button>
          <button className="images-button images-button--pause" onClick={this.pausePlaying}>
            <i className="icon icon__player icon___player--main icon__player--pause">
              <span className="glyph" /><span className="glyph" />
            </i>
          </button>
          <button className="images-button images-button--next" onClick={this.nextSlide}>
            <i className="icon icon__player icon__player--next">
              <span className="glyph" />
            </i>
          </button>
        </div>) :
        (<div className="giffy-controls giffy-controls--paused">
          <button className="images-button images-button--play" onClick={this.playImages}>
            <i className="icon icon__player icon___player--main icon__player--play">
              <span className="glyph" />
            </i>
          </button>
        </div>);

      return (<div className={this.state.playing ? 'c-project__images c-project__images--playing' : 'c-project__images'}>
        <div
          className="c-project__images__giffy"
          ref={(img) => { this.image = img; }}
          style={divStyle}
        />
        {buttons}
      </div>);
    }
    return null;
  }
}

ProjectDetailsGiffy.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
  videoEvent: PropTypes.func.isRequired,
  inTransition: PropTypes.bool.isRequired,
};

ProjectDetailsGiffy.defaultProps = {
  images: [],
};

export default ProjectDetailsGiffy;
