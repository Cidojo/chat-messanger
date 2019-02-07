import React from 'react';
import PropTypes from 'prop-types';

class ServerData extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      serverData: this.props.serverData
    };
    debugger
  }
  render() {
    return (
      <div>
        <ul>
          Connected userlist:
          {this.props.serverData.users.connected.slice(0).map((user, i) => {
            return (
              <li
                key={i}
              >
                {[user.id, `: `, user.name]}
              </li>
            )
          })}
        </ul>

        <ul>
          Registered userlist:
          {this.props.serverData.users.registered.slice(0).map((user, i) => {
            return (
              <li
                key={i}
              >
                {[user.id, `: `, user.name]}
              </li>
            )
          })}
        </ul>

        <ul>
          Rooms:
          {this.props.serverData.rooms.slice(0).map((room, i) => {
            return (
              <li
                key={i}
              >
                {[room.name, `: `, [...room.members]]}
              </li>
            )
          })}
        </ul>

      </div>
    )
  }
}

ServerData.propTypes = {
  serverData: PropTypes.object
}

export default ServerData;
