import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import App from './components/App';
import Home from './containers/Home';
import Styles from '../styles/main.scss'; //eslint-disable-line

render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="/contact" component={Home} />
    </Route>
  </Router>, document.getElementById('app'),
);
