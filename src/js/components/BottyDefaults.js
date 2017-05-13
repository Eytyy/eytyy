import React, { PropTypes } from 'react';

const BottyDefaults = ({ where, user, error, errorMsg }) => {
  const FormattedHtml = () => ({ __html: errorMsg });
  if (error) {
    return <span dangerouslySetInnerHTML={FormattedHtml()} />;
  }
  switch (where) {
    case 0:
      return <span>{'"Hi! What should I call you?"'}</span>;
    case 1:
      return <span>{`"Nice to meet you ${user.name.split(' ')[0]}. Choose a service:"`}</span>;
    case 2:
      return <span>{'"What is your email?"'}</span>;
    case 3: //eslint-disable-line
      const service = user.service === 'development' ? 'build' : 'design';
      return (
        <span>{`"Okay ${user.name.split(' ')[0]}! You want me to ${service} something for you. 
        Is there anything else you'd like to add?"`}</span>
      );
    case 4:
      return (
        <span>{'"What\'s the capital of Japan?"'}</span>
      );
    case 5:
      return (
        <span>{'"Thank you! Will get back to you soon."'}</span>
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
