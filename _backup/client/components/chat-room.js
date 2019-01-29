import React from 'react';
import PropTypes from 'prop-types';
import Messages from './messages';
import ChatInput from './chat-input';
import UsersList from './users-list';
// import roomSocket from './../room-socket';
import './chat-room.css';
import initSocketCli from './../socket';


const socketManager = initSocketCli();
window.socket = socketManager.client; // debugger for

class ChatRoom extends React.Component {
  constructor(props) {
    super(props);
    // set the initial state of messages so that it is not undefined on load

    this.state = {
      username: this.props.location.state.username, // this.socket.username
      messages: [],
      members: [],
      socket: this.props.location.state.socket
    };

    socketManager.joinHandler(this.state.username);
    socketManager.registerNameHandler(this.state.username);

    // Listen for messages from the server
    socketManager.onMessageReceived(this.addMessage.bind(this));

    // socketManager.emit('getHistory', (chatHistory) => {
    //   this.setState({chatHistory});
    // });

    this.sendHandler = this.sendHandler.bind(this);
    this.addMessage = this.addMessage.bind(this);
 }

 render() {
  return (
    <div className="chat-room">
      <h3 className="chat-room__title">Chat Room: {this.state.username}</h3>
      <div className="chat-room__container">
        <Messages messages={this.state.messages} />
        <ChatInput onSend={this.sendHandler} />
      </div>
      <UsersList />
    </div>
  );
  }

  sendHandler(message) {
    // Emit the message to the server
    socketManager.createMessageHandler(this.state.username, message);
    socketManager.onMessageReceived(this.addMessage);
  }

  addMessage(message) {
    // Append the message to the component state
    const messages = this.state.messages;
    messages.push(message);
    this.setState({messages});
  }
}

ChatRoom.propTypes = {
  state: PropTypes.any,
  location: PropTypes.any
}

export default ChatRoom;
