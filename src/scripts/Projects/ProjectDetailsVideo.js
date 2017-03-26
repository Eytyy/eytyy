import React, { Component, PropTypes } from 'react';
import CloseIcon from '../icons/Close';

class ProjectDetailsVideo extends Component {
  constructor() {
    super();
    this.play = this.play.bind(this);
    this.stop = this.stop.bind(this);
    this.state = {
      playing: false,
    };
    this.path = {
      images: 'https://s3.amazonaws.com/eytyy.com/public/images/projects',
      videos: 'https://s3.amazonaws.com/eytyy.com/public/videos',
    };
  }
  componentDidMount() {
    this.path.images = window.innerWidth > 568 ?
      'https://s3.amazonaws.com/eytyy.com/public/images/projects' :
      'https://s3.amazonaws.com/eytyy.com/public/images/projects-mobile';

    this.video.addEventListener('ended', this.stop);
  }
  componentWillUnmount() {
    this.video.removeEventListener('ended', this.stop);
  }
  play() {
    this.setState({
      playing: true,
    });
    this.video.play();
  }
  stop() {
    this.setState({
      playing: false,
    });
    this.video.pause();
    this.video.currentTime = 0;
  }
  render() {
    const link = this.props.video.videoLink;
    const poster = this.props.video.placeholder;
    const controls = this.state.playing ?
      (<div className="c-media-controls c-media-controls--on">
        <button
          className="c-media-controls__button c-media-controls__button--stop"
          onClick={this.stop}
        >
          <CloseIcon />
        </button>
      </div>) :
      (<div className="c-media-controls c-media-controls--off">
        <button
          className="c-media-controls__button c-media-controls__button--play"
          onClick={this.play}
        >
          <i className="icon icon--media icon--media--play">
            <span className="glyph" />
          </i>
        </button>
      </div>);
    return (
      <div className="c-video">
        <video
          ref={(vid) => { this.video = vid; }}
          src={`${this.path.videos}/${link}`}
          poster={`${this.path.images}/${poster}`}
        />
        {controls}
      </div>
    );
  }
}

ProjectDetailsVideo.propTypes = {
  video: PropTypes.shape({
    videoLink: PropTypes.string,
    placeholder: PropTypes.string,
  }),
};

ProjectDetailsVideo.defaultProps = {
  video: {},
};

export default ProjectDetailsVideo;
