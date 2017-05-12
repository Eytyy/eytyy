import React, { PropTypes } from 'react';
import ProjectDetailsGiffy from './ProjectDetailsGiffy';
import ProjectDetailsVideo from './ProjectDetailsVideo';
import ProjectDetailsCollaborators from './ProjectDetailsCollaborators';

const ProjectDetails = ({
  active,
  desc,
  inTransition,
  media,
  name,
  year,
  collaborators,
  website,
}) => {
  if (!active) return null;
  const FormattedHtml = () => ({ __html: desc });
  return (
    <div className="c-project__content">
      <div className="c-project__description" dangerouslySetInnerHTML={FormattedHtml()} />
      <div className="c-project__bottom">
        {
          media.type === 'giffy' ?
            <ProjectDetailsGiffy images={media.images} inTransition={inTransition} name={name} /> :
            <ProjectDetailsVideo video={media} inTransition={inTransition} />
        }
        <div className="c-project__details">
          <div className="c-project__details__item c-project__year">
            <span className="label">Year:</span> {year}
          </div>
          <ProjectDetailsCollaborators collaborators={collaborators} />
          <div className="c-project__details__item c-project__links">
            <a
              className="c-project__links__item"
              alt={`visit ${name}`}
              rel="noopener noreferrer"
              target="_blank"
              href={`http://${website}`}
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
  name: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  website: PropTypes.string,
  collaborators: PropTypes.arrayOf(PropTypes.object).isRequired,
  media: PropTypes.shape({
    type: PropTypes.string,
    images: PropTypes.array,
    videoLink: PropTypes.string,
    placeholder: PropTypes.string,
  }).isRequired,
  year: PropTypes.string.isRequired,
  active: PropTypes.bool,
  inTransition: PropTypes.bool.isRequired,
};

ProjectDetails.defaultProps = {
  active: false,
  website: undefined,
};

export default ProjectDetails;
