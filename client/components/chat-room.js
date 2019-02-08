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
      username: this.props.location.username,
      currentRoom: this.props.location.initialRoom,
      rooms: [this.props.location.initialRoom],
      globalUserList: [],
      messages: [],

      serverData: {
        users: {
          connected: [],
          registered: []
        },
        rooms: []
      }
    };

    this.updateMemberList = this.updateMemberList.bind(this);
    this.updateGlobalUserList = this.updateGlobalUserList.bind(this);

    this.postMessage = this.postMessage.bind(this);
    this.getUserMessage = this.getUserMessage.bind(this);

    this.handleInvite = this.handleInvite.bind(this);
    this.handleChangeRoom = this.handleChangeRoom.bind(this);
    this.handleChatScreenToggle = this.handleChatScreenToggle.bind(this);
    this.onInvitationAccept = this.onInvitationAccept.bind(this);


    this.socketCli = this.props.location.socketCli;
    this.socketCli.getGlobalUserList(this.updateGlobalUserList);
    this.socketCli.refreshGlobal(this.updateGlobalUserList);
    this.socketCli.refreshRoom(this.updateMemberList);
    this.socketCli.enterRoom(this.handleChangeRoom);
    this.socketCli.onGetMessage(this.getUserMessage);
    this.socketCli.onNewUser(this.getUserMessage);

    this.socketCli.onInvite(this.getSystemMessage);


    this.socketCli.onServerData(this.onServerData);
  }

  render() {
    const toggleBar = this.state.rooms.slice(0).map((room, i) => {
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
                <Messages messages={this.state.messages} onAccept={this.onInvitationAccept} />
                <ChatInput onPostMessage={this.postMessage} />
              </div>
              <RoomUsersList members={this.state.currentRoom.members} />
            </li>
          </ul>
        </div>
        <GlobalUsersList users={this.state.globalUserList} self={this.state.username} handleInvite={this.handleInvite} />
      </div>
    );
  }

  handleChatScreenToggle(e) {
    const roomIndex = this.state.rooms.findIndex((room) => room.name === e.target.value);
    this.setState({
      currentRoom: this.state.rooms[roomIndex]
    })
  }

  postMessage(message) {
    this.socketCli.postMessage(this.state.currentRoom.name, message);
  }

  getUserMessage(message) {
    this.setState({
      messages: [...this.state.messages, message]
    });
  }

  updateMemberList(list) {
    this.setState({members: list});
  }

  updateGlobalUserList(list) {
    this.setState({globalUserList: list});
  }

  handleInvite(to) {
    if(to !== this.state.username) {
      this.socketCli.invite(to, this.currentRoom.name);
    }
  }

  onInvitationAccept(e) {
    this.socketCli.onInvitationAccept(e.target.value, this.state.username, this.onChangeRoom);
  }

  handleChangeRoom(room) {
    this.setState({
      room,
      currentRoomIndex: this.state.rooms.indexOf(room.name)
    });
  }
}

ChatRoom.propTypes = {
  location: PropTypes.any
}

export default ChatRoom;
