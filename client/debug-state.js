import React from 'react';
import PropTypes from 'prop-types';

class DebugState extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.location.state.username,
      socketCli: this.props.location.state.socketCli
    }
 }

render() {
  return (
    <div className="chat-room">
      <h3 className="chat-room__title">Debugging:</h3>
      <ul>All Clients online:
        {this.state.socketCli.map((client, k) => {
          return (
            <li key={k}>
              ID: {client.id} , NAME: {client.username}
            </li>
          );
        })}
      </ul>
      <ul>Registered Clients online:
        {this.state.socketCli.map((client, k) => {
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
}

DebugState.propTypes = {
  location: PropTypes.object
}

export default DebugState;
