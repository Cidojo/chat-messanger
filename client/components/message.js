import React from 'react';
import PropTypes from 'prop-types';
import './message.css';

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: this.props.message
    }
  }

  render() {
      return (
        <li className="message">
          <span className={`message__username`}>
            {[this.state.message.createdAt, this.state.message.from || ``]} :&nbsp;
          </span>

          <span className="message__body">
            {this.state.message.text}
          </span>
          {this.state.message.host ?
            <button onClick={this.props.onAccept} value={this.state.message.host} >Accept</button> :
          ``
          }
        </li>
      );
    }
  }

  Message.propTypes = {
    message: PropTypes.any,
    onAccept: PropTypes.func
  }

  export default Message;
