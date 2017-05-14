import React, { PropTypes } from 'react';

const BottyDefaults = ({ where, error, errorMsg }) => {
  const FormattedHtml = () => ({ __html: errorMsg });
  if (error) {
    return <span dangerouslySetInnerHTML={FormattedHtml()} />;
  }
  switch (where) {
    case 0:
      return <span>{'What\'s your name?'}</span>;
    case 1:
      return <span>{'Choose a service:'}</span>;
    case 2:
      return <span>{'What is your email?'}</span>;
    case 3: //eslint-disable-line
      return (
        <span>{'Is there anything else you\'d like to add?'}</span>
      );
    case 4:
      return (
        <span>{'What\'s the capital of Japan?'}</span>
      );
    case 5:
      return (
        <span>{'Thank you! Will get back to you soon.'}</span>
      );
    default:
      return null;
  }
};

export default BottyDefaults;

BottyDefaults.propTypes = {
  where: PropTypes.number.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    service: PropTypes.string,
    message: PropTypes.string,
    botto: PropTypes.string,
  }).isRequired,
  error: PropTypes.bool.isRequired,
  errorMsg: PropTypes.string.isRequired,
};
