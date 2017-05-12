import React, { PropTypes } from 'react';


const ProjectDetailsCollaborators = (props) => {
  const uniqueKey = name => `${Math.ceil(Math.random() * 100)}-${name}`;
  const list = props.collaborators ? props.collaborators.map(item => (
    <a
      className="c-project__collaborators__item"
      key={uniqueKey(item.name)} href={`http://${item.link}`}
      target="_blank"
      rel="noopener noreferrer"
    >{item.name}</a>
  )) : null;
  return (
    <div className="c-project__details__item c-project__collaborators">
      <span>Collaborators: </span>{list}
    </div>
  );
};

ProjectDetailsCollaborators.propTypes = {
  collaborators: PropTypes.arrayOf(PropTypes.object),
};

ProjectDetailsCollaborators.defaultProps = {
  collaborators: [],
};

export default ProjectDetailsCollaborators;
