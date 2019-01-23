import React from 'react';
import PropTypes from 'prop-types';
import Messages from './messages';
import ChatInput from './chat-input';
import UsersList from './users-list';
import config from './../config.js';
import io from 'socket.io-client';
import './chat-room.css';

class ChatRoom extends React.Component {
  constructor(props, name) {
    super(props);

    // set the initial state of messages so that it is not undefined on load
    this.state = {
      messages: [],
      name
    };

    // Connect to the server
    this.socket = io(config.api).connect();

    // Listen for messages from the server
    this.socket.on('server:message', (message) => {
      this.addMessage(message);
    });

    this.socket.emit('getHistory', (chatHistory) => {
      this.setState({chatHistory});
    });

    this.sendHandler = this.sendHandler.bind(this);
    this.addMessage = this.addMessage.bind(this);
 }

  render() {
    return (
      <div className="chat-room">
        <h3 className="chat-room__title">Chat Room: this.state.name</h3>
        <div className="chat-room__container">
          <Messages messages={this.state.messages} />
          <ChatInput onSend={this.sendHandler} />
        </div>
        <UsersList />
      </div>
    );
  }

  sendHandler(message) {
    const messageObject = {
      date: new Date().toLocaleTimeString(),
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
  username: PropTypes.string,
  chatHistory: PropTypes.any
}

export default ChatRoom;
