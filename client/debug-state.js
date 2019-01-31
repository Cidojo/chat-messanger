import React from 'react';
import PropTypes from 'prop-types';
import './debug-state.css';
import initSocketCli from './socket-cli';

class DebugState extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: `Debugger`,
      clientsAll: [],
      clientsRegistered: []
    }

    this.socketCli = initSocketCli('/debugger');

    // this.socketCli.registerName(this.state.username, (flag) => this.setState({registered: flag}));
    this.socketCli.debugGetAllUsers(this.onGetAllUsers.bind(this));
    this.socketCli.debugGetRegisteredUsers(this.onGetRegisteredUsers.bind(this));
    this.socketCli.debugOnUpdate(this.onUpdateUsers.bind(this));
 }

render() {
  return (
    <div className="debug">
      <h3 className="debug__title">Debugging:</h3>
      <ul className="debug__list">All Clients online:
        {this.state.clientsAll ? this.state.clientsAll.map((client, k) => {
          return (
            <li key={k} className="debug__item">
              ID: {client.id} , NAME: {client.name}
            </li>
          );
        }) :
      ``}
      </ul>
      <ul className="debug__list">Registered Clients online:
        {this.state.clientsRegistered ? this.state.clientsRegistered.map((client, k) => {
          return (
            <li key={k} className="debug__item">
              ID: {client.id} , NAME: {client.name}
            </li>
          );
        }) :
      ``}
      </ul>
    </div>
    );
  }

  onUpdateUsers(all, registered) {
    this.setState({
      clientsAll: all,
      clientsRegistered: registered
    });
  }

  onGetAllUsers(all) {
    this.setState({
      clientsAll: all
    });
  }

  onGetRegisteredUsers(registered) {
    this.setState({
      clientsRegistered: registered
    });
  }
}

DebugState.propTypes = {
  location: PropTypes.object
}

export default DebugState;
