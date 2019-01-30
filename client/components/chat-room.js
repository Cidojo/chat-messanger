import React from 'react';
import PropTypes from 'prop-types';
import Messages from './messages';
import ChatInput from './chat-input';
import UsersList from './users-list';
import './chat-room.css';


class ChatRoom extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: this.props.location.username,
      messages: [],
      members: [],
    };

    this.socketCli = this.props.location.socketCli;

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
    this.socketCli.createMessageHandler(this.state.username, message);
    this.socketCli.onMessageReceived(this.addMessage);
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
