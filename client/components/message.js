import React from 'react';
import PropTypes from 'prop-types';
import './message.css';

class Message extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
      // Was the message sent by the current user. If so, add a css class
      const fromMe = this.props.fromMe ? 'message__username--from-me' : '';

      return (
        <li className="message">
          <span className={`message__username ${fromMe}`}>
            {[this.props.date, this.props.username].join(`---`)}:&nbsp;
          </span>

          <span className="message__body">
            {this.props.message}
          </span>
        </li>
      );
    }
  }

  Message.propTypes = {
    date: PropTypes.string,
    message: PropTypes.string,
    username: PropTypes.string,
    fromMe: PropTypes.bool
  }

  export default Message;
