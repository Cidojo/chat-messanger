import React from 'react';
import PropTypes from 'prop-types';
import Messages from './messages';
import ChatInput from './chat-input';
import RoomUsersList from './room-users-list';
import GlobalUsersList from './global-users-list';
import RoomManager from './../room-manager';
import './chat-room.css';


class ChatRoom extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: this.props.location.username,
      currentRoom: this.props.location.initialRoom,
      globalUserList: [],
      messages: []
    };

    this.roomManager = new RoomManager();
    this.roomManager.addRoom(this.props.location.initialRoom);

    this.updateMemberList = this.updateMemberList.bind(this);
    this.updateGlobalUserList = this.updateGlobalUserList.bind(this);

    this.postMessage = this.postMessage.bind(this);
    this.getUserMessage = this.getUserMessage.bind(this);

    this.handleInvite = this.handleInvite.bind(this);
    this.changeRoom = this.changeRoom.bind(this);
    this.handleChatScreenToggle = this.handleChatScreenToggle.bind(this);
    this.onInvitationAccept = this.onInvitationAccept.bind(this);


    this.socketCli = this.props.location.socketCli;
    this.socketCli.getGlobalUserList(this.updateGlobalUserList);
    this.socketCli.refreshGlobal(this.updateGlobalUserList);
    this.socketCli.refreshRoom(this.updateMemberList);
    this.socketCli.enterRoom(this.handleChangeRoom);
    this.socketCli.onGetMessage(this.getUserMessage);
    this.socketCli.onNewUser(this.getUserMessage);
    this.socketCli.onInvite(this.getUserMessage);



    this.socketCli.onServerData(this.onServerData);
  }

  render() {
    const toggleBar = this.roomManager.getRooms().map((room, i) => {
        return (
          <li key={i} className="chat-room__toggle">
            <label>
              {room.name}
              <input
                type="radio"
                name="chat-room__toggle"
                className="visually-hidden"
                value={room.name}
                onChange={this.handleChatScreenToggle}
                checked={this.state.currentRoom.name === room.name}
              />
            </label>
          </li>
        )
      });

    return (
      <div className="chat-room">
        <ul className="chat-room__toggle-bar">
          {toggleBar}
        </ul>
        <div className="chat-room__window">
          <ul className="chat-room__list">
            <li className={`chat-room__item`}>
              <h3 className="chat-room__title">Chat Room: {this.state.currentRoom.name}</h3>
              <div className="chat-room__container">
                <Messages messages={this.state.messages} onInvitationAccept={this.onInvitationAccept} />
                <ChatInput onPostMessage={this.postMessage} />
              </div>
              <RoomUsersList members={this.state.currentRoom.members} />
            </li>
          </ul>
        </div>
        <GlobalUsersList usersList={this.state.globalUserList} self={this.state.username} handleInvite={this.handleInvite} />
      </div>
    );
  }

  handleChatScreenToggle(e) {
    this.changeRoom(e.target.value);
  }

  postMessage(message) {
    this.socketCli.postMessage(this.state.currentRoom.name, message);
  }

  getUserMessage(roomName, message) {
    const room = message.type !== `user` ? this.state.currentRoom : this.roomManager.getRoom(roomName);
    room.chatHistory.push(message);

    if (this.state.currentRoom.name === roomName || message.type !== `user`) {
      this.setState({
        messages: room.chatHistory
      });
    }
  }

  updateMemberList(list) {
    this.setState({members: list});
  }

  updateGlobalUserList(list) {
    this.setState({globalUserList: list});
  }

  handleInvite(invited) {
    this.socketCli.invite(invited, this.state.currentRoom.name);
  }

  onInvitationAccept(e) {
    const accept = (room) => {
      this.roomManager.addRoom(room);
      this.changeRoom(room.name);
    }

    this.socketCli.onInvitationAccept(e.target.value, this.state.username, accept.bind(this));
  }

  changeRoom(roomName) {
    const room = this.roomManager.getRoom(roomName);

    this.setState({
      currentRoom: room,
      messages: room.chatHistory
    });
  }
}

ChatRoom.propTypes = {
  location: PropTypes.any
}

export default ChatRoom;
