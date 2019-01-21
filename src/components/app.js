import React from 'react';
import './../style/app.css';
import {hot} from 'react-hot-loader';


class App extends React.Component {
  render() {
    return (
      <div className="app">
        <h1>{`Chat Messenger`}</h1>
      </div>
    );
  }
}

export default hot(module)(App);
