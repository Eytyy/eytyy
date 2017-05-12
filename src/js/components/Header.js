import React, { PropTypes } from 'react';

const Header = props => (
  <header className="main-header">
    <p className="greetings">{props.title}</p>
  </header>);

Header.propTypes = {
  title: PropTypes.string,
};

Header.defaultProps = {
  title: 'Hello',
};

export default Header;
