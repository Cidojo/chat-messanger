import React from 'react';
import PropTypes from 'prop-types';

class DebugState extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.location.username,
      clientsAll: [],
      clientsRegistered: [],
      socketCli: this.props.location.socketCli
    }

    // this.state.socketCli = this.props.location.socketCli;
    this.state.socketCli.debugGetAllClients(this.onGetAllClients.bind(this));
    this.state.socketCli.debugGetRegisteredClients(this.onGetRegisteredClients.bind(this));
    this.state.socketCli.debugOnUpdate(this.onUpdateUsers.bind(this));
 }

render() {
  return (
    <div className="chat-room">
      <h3 className="chat-room__title">Debugging:</h3>
      <ul>All Clients online:
        {this.state.clientsAll.map((client, k) => {
          return (
            <li key={k}>
              ID: {client.id} , NAME: {client.username}
            </li>
          );
        })}
      </ul>
      <ul>Registered Clients online:
        {this.state.clientsRegistered.map((client, k) => {
          return (
            <li key={k}>
              ID: {client.id} , NAME: {client.username}
            </li>
          );
        })}
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

  onGetAllClients(all) {
    this.setState({
      clientsAll: all
    });
  }

  onGetRegisteredClients(registered) {
    this.setState({
      clientsRegistered: registered
    });
  }
}

DebugState.propTypes = {
  location: PropTypes.object
}

export default DebugState;
