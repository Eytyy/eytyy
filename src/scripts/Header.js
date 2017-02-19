import React, { PropTypes } from 'react';

const Header = props => (
  <header className="main-header">
    <p className="greetings">Hello <br />{props.title},</p>
  </header>);

Header.propTypes = {
  title: PropTypes.string,
};

Header.defaultProps = {
  title: 'Friend',
};

export default Header;
