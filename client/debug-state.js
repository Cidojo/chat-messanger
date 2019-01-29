import React from 'react';
import PropTypes from 'prop-types';

class DebugState extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.location.state.username,
      socket: this.props.location.state.username
    }
 }

render() {
  return (
    <div className="chat-room">
      <h3 className="chat-room__title">Debugging:</h3>
      <ul>
        <li></li>
        <li></li>
      </ul>
    </div>
    );
  }
}

DebugState.propTypes = {
  location: PropTypes.object
}

export default DebugState;
