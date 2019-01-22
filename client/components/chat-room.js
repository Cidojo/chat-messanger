import React from 'react';
import PropTypes from 'prop-types';
import Messages from './messages';
import ChatInput from './chat-input';
import config from './../config.js';
import io from 'socket.io-client';

class ChatRoom extends React.Component {
  constructor(props) {
    super(props);

    // set the initial state of messages so that it is not undefined on load
   this.state = {messages: []};

   // Connect to the server
   this.socket = io(config.api).connect();

   // Listen for messages from the server
    this.socket.on('server:message', message => {
      this.addMessage(message);
    });

   this.sendHandler = this.sendHandler.bind(this);
   this.addMessage = this.addMessage.bind(this);
  }

  render() {
    return (
      <div className="container">
        <h3>React Chat App</h3>
        <Messages messages={this.state.messages} />
        <ChatInput onSend={this.sendHandler} />
      </div>
    );
  }

  sendHandler(message) {
    const messageObject = {
      username: this.props.username,
      message
    };

    // Emit the message to the server
    this.socket.emit('client:message', messageObject);

    messageObject.fromMe = true;
    this.addMessage(messageObject);
  }

  addMessage(message) {
    // Append the message to the component state
    const messages = this.state.messages;
    messages.push(message);
    this.setState({messages});
  }
}

ChatRoom.propTypes = {
  username: PropTypes.string
}

export default ChatRoom;
