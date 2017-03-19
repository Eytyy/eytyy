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
    this.loadImages = this.loadImages.bind(this);
    this.updateLoadedImagesCount = this.updateLoadedImagesCount.bind(this);

    this.state = {
      on: false,
      playing: false,
      allImagesLoaded: false,
      loading: false,
      loadedImagesCount: 0,
    };

    this.path = 'https://s3.amazonaws.com/eytyy.com/public/images/projects';

    this.activeSlide = 0;
    this.initialSlide = null;
    this.timer = null;
    this.noOfSlides = 0;
    this.safeToPlay = true;
  }

  componentDidMount() {
    this.noOfSlides = this.props.images.length;
    this.path = window.innerWidth > 568 ?
      'https://s3.amazonaws.com/eytyy.com/public/images/projects' :
      'https://s3.amazonaws.com/eytyy.com/public/images/projects-mobile';
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.inTransition) {
      this.safeToPlay = false;
      this.stopPlaying();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextState.playing !== this.state.playing ||
      nextState.on !== this.state.on ||
      nextState.allImagesLoaded !== this.allImagesLoaded
    );
  }

  componentWillUnmount() {
    this.stopPlaying();
    window.removeEventListener('scroll', this.onScroll);
  }

  setSlide(slide) {
    const images = this.props.images;
    this.image.style.backgroundImage = `url(${this.path}/${images[slide]})`;
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
    this.setState({
      playing: false,
    });
  }

  stopPlaying() {
    if (this.state.playing) {
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

  updateLoadedImagesCount() {
    this.setState({
      loadedImagesCount: this.state.loadedImagesCount + 1,
    });
  }

  loadImages() {
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        if (this.props.images.length === this.state.loadedImagesCount) {
          resolve(true);
          clearInterval(interval);
        }
      }, 200);
    });
  }

  playImages() {
    const images = this.props.images;
    const imagesContainerOffset = this.image.parentNode.parentNode.parentNode.offsetTop;
    const mainHeaderOffset = document.querySelector('.main-header').offsetTop;
    const scrollPosition = imagesContainerOffset + mainHeaderOffset;

    window.scrollTo(0, scrollPosition);

    const start = () => {
      if (!this.safeToPlay) {
        console.log(`gonna prevent ${this.props.name} slider from playing to avoid things going batshit crazy`);
        this.safeToPlay = true;
        return;
      }
      let count = 0;
      this.timer = setInterval(() => {
        this.setSlide(count);
        count = count === images.length - 1 ? 0 : count + 1;
      }, 500);
    };

    if (!this.state.allImagesLoaded) {
      this.setState({
        on: true,
        loading: true,
      });

      this.loadImages().then((status) => {
        this.setState({
          loading: false,
          allImagesLoaded: true,
          playing: true,
        });
        start();
      });
    } else if (this.state.on) {
      // images loaded... if it's already active just play
      this.setState({
        playing: !this.state.playing,
      });
      start();
    } else {
      // Images are loadded, but player is closed... open it and start play
      this.setState({
        on: !this.state.on,
        playing: !this.state.playing,
      });
      start();
    }
  }

  render() {
    if (!this.props.images.length > 0) {
      return null;
    }

    const position = this.state.on && document.body.clientWidth > 720 ?
      document.querySelector('.projects-nav').clientHeight : 0;
    const style = {
      top: `${position}px`,
    };

    const divStyle = {
      backgroundImage: `url(${this.path}/${this.props.images[0]})`,
    };

    let noOfImges = 0;
    const loader = this.state.loading ?
      this.props.images.map((image) => {
        noOfImges += 1;
        const animstyle = {
          animation: `0.25s ease ${noOfImges / 10}s infinite reverse changebg`,
        };
        return (
          <div key={noOfImges} style={animstyle} className="image-holder">
            <img
              ref={(img) => { this.fake = img; }}
              src={`${this.path}/${image}`}
              alt="hi"
              onLoad={this.updateLoadedImagesCount}
            />
          </div>);
      }) : null;

    const buttons = this.state.on && !this.state.loading ?
      (<div className="c-media-controls c-media-controls--on" style={style}>
        <button
          className="c-media-controls__button c-media-controls__button--back"
          onClick={this.prevSlide}
        >
          <i className="icon icon--media icon--media--back">
            <span className="glyph" />
            <span className="glyph" />
          </i>
        </button>
        <button
          className="c-media-controls__button c-media-controls__button--stop"
          onClick={this.stopPlaying}
        >
          <i className="icon icon--media icon--media--stop">
            <span className="glyph" />
          </i>
        </button>

        {this.state.playing ?
          <button
            className="c-media-controls__button c-media-controls__button--pause"
            onClick={this.pausePlaying}
          >
            <i className="icon icon--media icon--media--pause">
              <span className="glyph" /><span className="glyph" />
            </i>
          </button> :
          <button
            className="c-media-controls__button c-media-controls__button--play"
            onClick={this.playImages}
          >
            <i className="icon icon--media icon--media--play">
              <span className="glyph" />
            </i>
          </button>}

        <button
          className="c-media-controls__button c-media-controls__button--next"
          onClick={this.nextSlide}
        >
          <i className="icon icon--media icon--media--next">
            <span className="glyph" />
            <span className="glyph" />
          </i>
        </button>
      </div>) :
      (<div className="c-media-controls c-media-controls--off">
        <button
          className="c-media-controls__button c-media-controls__button--play"
          onClick={this.playImages}
        >
          <i className="icon icon--media icon--media--play">
            <span className="glyph" />
          </i>
        </button>
      </div>);
    const stateClass = this.state.on ? 'c-project__images c-project__images--on' : 'c-project__images';
    const loadedClass = this.state.loading ? 'c-project__images--loading' : '';
    return (
      <div className={`${stateClass} ${loadedClass}`}>
        <div className="loader">
          <div className="loader__progress">{`${Math.floor((this.state.loadedImagesCount / this.props.images.length) * 10) * 10}%`}</div>
          <div className="loader__images">
            {loader}
          </div>
        </div>
        <div
          className="c-project__images__giffy"
          ref={(img) => { this.image = img; }}
          style={divStyle}
        />
        {buttons}
      </div>
    );
  }
}

ProjectDetailsGiffy.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
  inTransition: PropTypes.bool.isRequired,
  loading: PropTypes.bool,
};

ProjectDetailsGiffy.defaultProps = {
  loading: false,
  images: [],
};

export default ProjectDetailsGiffy;
