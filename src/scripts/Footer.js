import React from 'react';
import GithubIcon from './icons/Github';
import LinkedinIcon from './icons/Linkedin';

const Footer = () => (
  <footer className="footer">
    <div className="signature"><i className="icon rock-on">🤘</i>Eyas.</div>
    <div className="footer__links">
      <a className="footer__links__item" href="https://github.com/Eytyy">
        <GithubIcon />
      </a>
      <a className="footer__links__item" href="https://jo.linkedin.com/in/eytyy">
        <LinkedinIcon />
      </a>
    </div>
  </footer>
);

export default Footer;
