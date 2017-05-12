import React, { PropTypes } from 'react';
import Footer from './Footer';

const App = props => (
  <div className="main-wrapper">
    <main role="main">
      {React.cloneElement(props.children)}
    </main>
    <Footer />
  </div>
);

App.propTypes = {
  children: PropTypes.element.isRequired,
};

export default App;
