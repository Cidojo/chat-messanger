import React from 'react';
import PropTypes from 'prop-types';
import Messages from './messages';
import ChatInput from './chat-input';
import UsersList from './users-list';
import roomSocket from './../room-socket';
import './chat-room.css';

class ChatRoom extends React.Component {
  constructor(props) {
    super(props);

    // set the initial state of messages so that it is not undefined on load
    this.state = {
      name: this.props.state.username, // this.socket.username
      messages: [],
      members: [],
      socket: roomSocket(this.props.state.username)
    };

    this.state.socket.join(this.name);
    // Listen for messages from the server
    this.state.socket.onMessageReceived(this.addMessage);

    // this.state.socket.emit('getHistory', (chatHistory) => {
      // this.setState({chatHistory});
    // });

    this.sendHandler = this.sendHandler.bind(this);
    this.addMessage = this.addMessage.bind(this);
 }

  render() {
    return (
      <div className="chat-room">
        <h3 className="chat-room__title">Chat Room: {this.state.name}</h3>
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
      message
    };

    // Emit the message to the server
    this.state.socket.onMessageSend(messageObject, this.state.name);

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
  state: PropTypes.any
}

export default ChatRoom;
