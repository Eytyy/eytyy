import React, { Component } from 'react';

class App extends Component {
  constructor() {
    super();
  }
  render() {
    const path = this.props.location.pathname;
    const segment = path.split('/')[1] || 'root';
    return (
      <div className="main-wrapper">
        <main role="main">
          {React.cloneElement(this.props.children)}
        </main>
      </div>
    )
  }
}

export default App;