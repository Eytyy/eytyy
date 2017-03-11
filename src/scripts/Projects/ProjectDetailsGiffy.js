/* eslint no-console:off */
import React, { Component, PropTypes } from 'react';

class ProjectDetailsGiffy extends Component {
  constructor() {
    super();
    this.playImages = this.playImages.bind(this);
    this.stopPlaying = this.stopPlaying.bind(this);
    this.pausePlaying = this.pausePlaying.bind(this);
    this.nextSlide = this.nextSlide.bind(this);
    this.prevSlide = this.prevSlide.bind(this);
    this.state = {
      on: false,
      playing: false,
      activeSlide: 0,
    };
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
    return (
      nextState.playing !== this.state.playing ||
      nextState.on !== this.state.on);
  }
  componentWillUnmount() {
    this.stopPlaying();
    window.removeEventListener('scroll', this.onScroll);
  }
  setSlide(slide) {
    const images = this.props.images;
    this.image.style.backgroundImage = `url(./images/${images[slide]})`;
    this.setState({
      activeSlide: slide,
    });
  }
  nextSlide() {
    const slide = this.state.activeSlide >= this.noOfSlides - 1 ? 0 : this.state.activeSlide + 1;
    if (this.state.playing) this.pausePlaying();

    this.setSlide(slide);
  }
  prevSlide() {
    const slide = this.state.activeSlide === 0 ? this.noOfSlides - 1 : this.state.activeSlide - 1;

    if (this.state.playing) this.pausePlaying();

    this.setSlide(slide);
  }
  pausePlaying() {
    clearInterval(this.timer);
    this.setState({
      playing: false,
    });
  }
  stopPlaying() {
    console.log('stop');
    if (this.state.playing) {
      console.log('yes');
      clearInterval(this.timer);
      this.setState({
        on: false,
        playing: false,
      });
    } else {
      this.setState({
        on: false,
      });
    }
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

    if (this.state.on) {
      this.setState({
        playing: !this.state.playing,
      });
    } else {
      this.setState({
        on: !this.state.on,
        playing: !this.state.playing,
      });
    }
  }
  render() {
    console.log(this.state);
    const position = this.state.on ?
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
      const buttons = this.state.on ?
        (<div className="c-giffy-controls c-giffy-controls--on" style={style}>
          <button className="c-giffy-button c-giffy-button--back" onClick={this.prevSlide}>
            <i className="icon icon__player icon__player--back">
              <span className="glyph" />
              <span className="glyph" />
            </i>
          </button>
          <button className="c-giffy-button c-giffy-button--stop" onClick={this.stopPlaying}>
            <i className="icon icon__player icon__player--stop">
              <span className="glyph" />
            </i>
          </button>

          {this.state.playing ?
            <button className="c-giffy-button c-giffy-button--pause" onClick={this.pausePlaying}>
              <i className="icon icon__player icon___player--main icon__player--pause">
                <span className="glyph" /><span className="glyph" />
              </i>
            </button> :
            <button className="c-giffy-button c-giffy-button--play c-giffy-button--play--small" onClick={this.playImages}>
              <i className="icon icon__player icon___player--main icon__player--play">
                <span className="glyph" />
              </i>
            </button>}

          <button className="c-giffy-button c-giffy-button--next" onClick={this.nextSlide}>
            <i className="icon icon__player icon__player--next">
              <span className="glyph" />
              <span className="glyph" />
            </i>
          </button>
        </div>) :
        (<div className="c-giffy-controls c-giffy-controls--off">
          <button className="c-giffy-button c-giffy-button--play c-giffy-button--play--big" onClick={this.playImages}>
            <i className="icon icon__player icon___player--main icon__player--play">
              <span className="glyph" />
            </i>
          </button>
        </div>);

      return (<div className={this.state.on ? 'c-project__images c-project__images--on' : 'c-project__images'}>
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
  inTransition: PropTypes.bool.isRequired,
};

ProjectDetailsGiffy.defaultProps = {
  images: [],
};

export default ProjectDetailsGiffy;
