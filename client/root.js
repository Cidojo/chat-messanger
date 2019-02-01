import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './components/login';
import ChatRoom from './components/chat-room';
// import DebugState from './debug-state';
// <Route path="/" component={DebugState} />

const Root = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" component={Login} exact={true} />
          <Route path="/chatroom" component={ChatRoom} />
        </Switch>
      </div>
    </Router>
  )
}

export default Root;
