import React, { PropTypes } from 'react';
import ProjectDetailsGiffy from './ProjectDetailsGiffy';
import ProjectDetailsVideo from './ProjectDetailsVideo';
import ProjectDetailsCollaborators from './ProjectDetailsCollaborators';

const ProjectDetails = (props) => {
  if (!props.data.active) {
    return null;
  }

  return (
    <div className="c-project__content">
      <ProjectDescription body={props.data.desc} />
      <div className="c-project__bottom">
        {
          props.data.media.type === 'giffy' ?
            <ProjectDetailsGiffy
              videoEvent={props.videoEvent}
              images={props.data.media.images}
              inTransition={props.inTransition}
            /> :
            <ProjectDetailsVideo
              videoEvent={props.videoEvent}
              video={props.data.media.videoLink}
              inTransition={props.inTransition}
            />
        }
        <div className="c-project__details">
          <div className="c-project__details__item c-project__year">
            <span className="label">Year:</span> {props.data.year}
          </div>
          <ProjectDetailsCollaborators collaborators={props.data.collaborators} />
          <div className="c-project__details__item c-project__links">
            <a
              className="c-project__links__item"
              alt={`visit ${props.data.name}`}
              rel="noopener noreferrer"
              target="_blank"
              href={props.data.website}
            >
            Visit website &rarr;
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

ProjectDetails.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    nameShort: PropTypes.string,
    desc: PropTypes.string,
    url: PropTypes.string,
    website: PropTypes.string,
    collaborators: PropTypes.arrayOf(PropTypes.object),
    media: PropTypes.shape({
      type: PropTypes.string,
      images: PropTypes.array,
      videoLink: PropTypes.string,
    }),
    year: PropTypes.string,
    active: false,
    onFocus: false,
  }),
  videoEvent: PropTypes.func.isRequired,
  inTransition: PropTypes.bool.isRequired,
};

ProjectDetails.defaultProps = {
  data: {},
};

const ProjectDescription = (props) => {
  const FormattedHtml = () => ({ __html: props.body });
  return <div className="c-project__description" dangerouslySetInnerHTML={FormattedHtml()} />;
};

ProjectDescription.propTypes = {
  body: PropTypes.string,
};

ProjectDescription.defaultProps = {
  body: '',
};

export default ProjectDetails;
