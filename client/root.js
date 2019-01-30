import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './components/login';
import DebugState from './debug-state';
import ChatRoom from './components/chat-room';

const Root = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" component={Login} exact={true} />
          <Route path="/chatroom" component={ChatRoom} />
        </Switch>
        <Route path="/" component={DebugState} />
      </div>
    </Router>
  )
}

export default Root;
