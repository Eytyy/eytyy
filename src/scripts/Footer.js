import React from 'react';

const Footer = () => (
  <footer className="footer">
    <div className="signature"><i className="icon rock-on">🤘</i>Eyas.</div>
    <div className="footer__links">
      <a className="footer__links__item" href="https://github.com/Eytyy">
        <i className="icon svg-icon">
          <svg width="18px" height="19px" viewBox="0 0 18 19" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <g
              id="github-icon" stroke="none" strokeWidth="1" fill="none"
              fillRule="evenodd" fontSize="20" fontFamily="Ionicons" fontWeight="400"
            >
              <text id="github-icon-text" fill="#000000">
                <tspan x="0" y="17"></tspan>
              </text>
            </g>
          </svg>
        </i>
      </a>
      <a className="footer__links__item" href="https://jo.linkedin.com/in/eytyy">
        <i className="icon svg-icon">
          <svg width="15px" height="15px" viewBox="0 0 15 15" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <g
              id="linkedin-icon" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"
              fontSize="20" fontFamily="Ionicons" fontWeight="400"
            >
              <text id="ion-social-linkedin---Ionicons" fill="#000000">
                <tspan x="0" y="15"></tspan>
              </text>
            </g>
          </svg>
        </i>
      </a>
    </div>
  </footer>
);

export default Footer;
