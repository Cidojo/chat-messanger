import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './components/login';
import ChatRoom from './components/chat-room';
import './components/scaffolding.css';

const Root = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Login} exact={true} />
        <Route path="/chatroom" component={ChatRoom} />
      </Switch>
    </Router>
  )
}

export default Root;
