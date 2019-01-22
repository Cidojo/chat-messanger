import React from 'react';
import PropTypes from 'prop-types';
import Message from './message';

class Messages extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
      // Loop through all the messages in the state and create a Message component
      const messages = this.props.messages.map((message, i) => {
          return (
            <Message
              key={i}
              username={message.username}
              message={message.message}
              fromMe={message.fromMe} />
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
  messages: PropTypes.arrayOf(PropTypes.any)
}

export default Messages;
