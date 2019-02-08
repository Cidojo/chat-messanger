import React from 'react';
import PropTypes from 'prop-types';
import Message from './message';
import './messages.css';

class Messages extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
      // Loop through all the messages in the state and create a Message component
      const messages = this.props.messages.slice(0).map((message, i) => {
          return (
            <Message
              key={i}
              message={message}
              onInvitationAccept={this.props.onInvitationAccept}
            />
          );
        });

      return (
        <ul className='messages' id='messages'>
          {messages}
        </ul>
      );
    }

    componentDidUpdate() {
      // get the messagelist container and set the scrollTop to the height of the container
      const objDiv = document.getElementById('messages');
      objDiv.scrollTop = objDiv.scrollHeight;
    }
  }

Messages.propTypes = {
  messages: PropTypes.array,
  onInvitationAccept: PropTypes.func
}

export default Messages;
