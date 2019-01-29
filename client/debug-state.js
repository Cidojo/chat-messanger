import React from 'react';
import PropTypes from 'prop-types';

class DebugState extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.location.state.username,
      socketCli: this.props.location.state.socketCli,
      clientLists: {
        all: [],
        registered: []
      }
    }

    // this.socketCli.debugGetAllClients(this.onUpdateUsers.bind(this));
    // this.socketCli.debugGetRegisteredClients(this.onGetRegisteredClients.bind(this));
    // this.socketCli.debugOnUpdate(this.onUpdate.bind(this));

    // this.socketCli.debugGetAllClients(console.log);
    // this.socketCli.debugGetRegisteredClients(console.log);
    // this.socketCli.debugOnUpdate(console.log);
 }

render() {
  return (
    <div className="chat-room">
      <h3 className="chat-room__title">Debugging:</h3>
      <ul>All Clients online:
        {this.state.clientLists.all.map((client, k) => {
          return (
            <li key={k}>
              ID: {client.id} , NAME: {client.username}
            </li>
          );
        })}
      </ul>
      <ul>Registered Clients online:
        {this.state.clientLists.registered.map((client, k) => {
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
      debug: {
        all,
        registered
      }
    });
  }

  onGetAllClients(all) {
    this.setState({
      debug: {
        all
      }
    });
  }

  onGetRegisteredClients(registered) {
    this.setState({
      debug: {
        registered
      }
    });
  }
}

DebugState.propTypes = {
  location: PropTypes.object
}

export default DebugState;
