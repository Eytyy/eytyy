import React, { Component, PropTypes } from 'react';

class ProjectDetailsVideo extends Component {
  constructor() {
    super();
    this.play = this.play.bind(this);
    this.stop = this.stop.bind(this);
    this.state = {
      playing: false,
    };
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
    const link = this.props.video;
    const controls = this.state.playing ?
      (<div className="c-media-controls c-media-controls--on">
        <button
          className="c-media-controls__button c-media-controls__button--stop"
          onClick={this.stop}
        >
          <i className="icon icon--media icon--media--stop">
            <span className="glyph" />
          </i>
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
        <video ref={(vid) => { this.video = vid; }} src={`videos/${link}`} />
        {controls}
      </div>
    );
  }
}

ProjectDetailsVideo.propTypes = {
  video: PropTypes.string,
};

ProjectDetailsVideo.defaultProps = {
  video: 'https://youtu.be/7VXo__wh3Mc',
};

export default ProjectDetailsVideo;
