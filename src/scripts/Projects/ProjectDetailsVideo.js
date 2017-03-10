import React, { PropTypes } from 'react';

const ProjectDetailsVideo = (props) => {
  const link = props.video;
  return (
    <div className="video">
      <iframe
        id="existing-iframe-example"
        width="640" height="360"
        src={`https://www.youtube.com/embed/${link}?enablejsapi=1&rel=0&showinfo=0&controls=0`}
        frameBorder="0"
      />
    </div>
  );
};

ProjectDetailsVideo.propTypes = {
  video: PropTypes.string,
};

ProjectDetailsVideo.defaultProps = {
  video: 'https://youtu.be/7VXo__wh3Mc',
};

export default ProjectDetailsVideo;
