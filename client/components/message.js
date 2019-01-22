import React from 'react';
import PropTypes from 'prop-types';


class Message extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
      // Was the message sent by the current user. If so, add a css class
      const fromMe = this.props.fromMe ? 'message--from-me' : '';

      return (
        <div className={`message ${fromMe}`}>
          <div className='message__username'>
            { this.props.username }
          </div>
          <div className='message__body'>
            { this.props.message }
          </div>
        </div>
      );
    }
  }

  Message.propTypes = {
    message: PropTypes.string,
    username: PropTypes.string,
    fromMe: PropTypes.bool
  }

  export default Message;
