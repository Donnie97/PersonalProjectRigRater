import React, { Component } from 'react';
import './App.css';
import './reset.css';
import Routing from './components/router/router'

class App extends Component {
  render() {
    return (
      <div>
        <Routing/>
      </div>
    );
  }
}

export default App;
