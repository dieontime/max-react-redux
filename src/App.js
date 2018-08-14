import React, { Component } from 'react';
import Test, { Com } from './components/test';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Hello</h1>
        <Test />
        <Com awesome="yes"><i>child</i></Com>
      </div>
    );
  }
}

export default App;
