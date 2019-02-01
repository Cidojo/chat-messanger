import React from 'react';
import PropTypes from 'prop-types';
import Messages from './messages';
import ChatInput from './chat-input';
import RoomUsersList from './room-users-list';
import GlobalUsersList from './global-users-list';
import './chat-room.css';


class ChatRoom extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      room: this.props.location.defaultRoom,
      username: this.props.location.username,
      messages: [],
      members: [],
      globalUsers: []
    };

    this.roomUserList = React.createRef();
    this.globalUserList = React.createRef();


    this.updateMembersList = this.updateMembersList.bind(this);
    this.updateGlobalUsersList = this.updateGlobalUsersList.bind(this);
    this.sendHandler = this.sendHandler.bind(this);
    this.addMessage = this.addMessage.bind(this);
    this.invite = this.invite.bind(this);


    this.socketCli = this.props.location.socketCli;
    this.socketCli.getRoomMembersList(this.state.room, this.updateMembersList);
    this.socketCli.getGlobalUsersList(this.updateGlobalUsersList);
    this.socketCli.onMessageReceived(this.addMessage);
 }

 render() {
    return (
      <div className="chat-room">
        <h3 className="chat-room__title">Chat Room: {this.state.username}</h3>
        <div className="chat-room__container">
          <Messages messages={this.state.messages} />
          <ChatInput onSend={this.sendHandler} />
        </div>
        <RoomUsersList ref={this.roomUserList} members={this.state.members} />
        <GlobalUsersList ref={this.globalUserList} users={this.state.globalUsers} onInvite={this.invite} />
      </div>
    );
  }

  sendHandler(message) {
    // Emit the message to the server
    this.socketCli.createMessageHandler(this.state.room, message);
  }

  addMessage(message) {
    this.setState({messages: [...this.state.messages, message]});
  }

  updateMembersList(list) {
    this.setState({members: list});
    this.roomUserList.current.updateList(list);
  }

  updateGlobalUsersList(list) {
    this.setState({users: list});
    this.globalUserList.current.updateList(list);
  }

  invite(to) {
    this.socketCli.inviteHandler(to, this.state.room);
  }
}

ChatRoom.propTypes = {
  state: PropTypes.any,
  location: PropTypes.any,
  room: PropTypes.string
}

export default ChatRoom;
