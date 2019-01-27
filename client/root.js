import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import UsernameForm from './components/username-form';
import ChatRoom from './components/chat-room';

const Root = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" component={UsernameForm} exact={true} />
          <Route path="/chatroom" component={ChatRoom} />
        </Switch>
      </div>
    </Router>
  )
}

export default Root;
