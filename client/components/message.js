import React from 'react';
import PropTypes from 'prop-types';
import './message.css';

class Message extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
      return (
        <li className="message">
          <span className={`message__username`}>
            {[this.props.message.createdAt, this.props.message.from || ``]} :&nbsp;
          </span>

          <span className="message__body">
            {this.props.message.text}
          </span>
          {this.props.message.host ?
            <button onClick={this.props.acceptInvite} value={this.props.message.host} >Accept</button> :
          ``
          }
        </li>
      );
    }
  }

  Message.propTypes = {
    message: PropTypes.object,
    acceptInvite: PropTypes.func
  }

  export default Message;
