import React from 'react';
import PropTypes from 'prop-types';
import Messages from './messages';
import ChatInput from './chat-input';
import RoomUsersList from './room-users-list';
import GlobalUsersList from './global-users-list';
import ChangeRoomDialog from './change-room-dialog';
import RoomManager from './../room-manager';
import './chat-room.css';


class ChatRoom extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: this.props.location.username,
      currentRoom: this.props.location.room,
      globalUsersList: this.props.location.globalUsersList
    };

    this.roomManager = new RoomManager();
    this.roomManager.add(this.state.currentRoom);

    this.onChangeMembersList = this.onChangeMembersList.bind(this);
    this.onChangeGlobalUsersList = this.onChangeGlobalUsersList.bind(this);

    this.postMessage = this.postMessage.bind(this);
    this.getUserMessage = this.getUserMessage.bind(this);

    this.handleInvite = this.handleInvite.bind(this);
    this.switchRoom = this.switchRoom.bind(this);
    this.handleChatScreenToggle = this.handleChatScreenToggle.bind(this);
    this.acceptInvite = this.acceptInvite.bind(this);
    this.fetchRoom = this.fetchRoom.bind(this);
    this.joinRoom = this.joinRoom.bind(this);


    this.socketCli = this.props.location.socketCli;
    this.socketCli.onChangeGlobalUsersList(this.onChangeGlobalUsersList);
    this.socketCli.onChangeMembersList(this.onChangeMembersList, this.getUserMessage);
    this.socketCli.onGetMessage(this.getUserMessage);
    this.socketCli.onInvitation(this.getUserMessage);
  }

  render() {
    const userRooms = this.roomManager.getAll();

    const toggleBar = userRooms.map((room, i) => {
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
            {userRooms.length > 1 ?
            <button onClick={this.leaveRoom.bind(this, room.name)}>x</button>
            :
            ``
            }
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
              <span>logged as {this.state.username}</span>
              <h3 className="chat-room__title">Chat Room: {this.state.currentRoom.name}</h3>
              <div className="chat-room__container">
                <Messages messages={this.state.currentRoom.chatHistory} acceptInvite={this.acceptInvite} />
                <ChatInput onPostMessage={this.postMessage} />
              </div>
              <RoomUsersList members={this.state.currentRoom.members} />
            </li>
          </ul>
        </div>
        <GlobalUsersList globalUsersList={this.state.globalUsersList} self={this.state.username} handleInvite={this.handleInvite} />
        <ChangeRoomDialog joinRoomHandler={this.joinRoom} />
      </div>
    );
  }

  handleChatScreenToggle(e) {
    this.switchRoom(e.target.value);
  }

  postMessage(message) {
    this.socketCli.postMessage(this.state.currentRoom.name, message);
  }

  getUserMessage(roomName, message) {
    const room = this.roomManager.getByName(roomName) || this.state.currentRoom;
    room.chatHistory.push(message);

    if (room.name === this.state.currentRoom.name) {
      this.setState({
        currentRoom: {
          ...this.state.currentRoom,
          chatHistory: room.chatHistory
        }
      });
    }
  }

  leaveRoom(roomName) {
    this.roomManager.delete(roomName);

    const currentRooms = this.roomManager.getAll();

    this.switchRoom(currentRooms[currentRooms.length - 1].name);
    this.socketCli.leaveRoom(roomName);
  }

  onChangeMembersList(list) {
    this.setState({
      currentRoom: {
        ...this.state.currentRoom,
        members: list
      }
    });

    this.roomManager.getByName(this.state.currentRoom.name).members = list;
  }

  onChangeGlobalUsersList(list) {
    this.setState({globalUsersList: list});
  }

  handleInvite(invited) {
    this.socketCli.invite(invited, this.state.currentRoom.name);
  }

  acceptInvite(e) {
    if (this.roomManager.rooms.has(e.target.value)) {
      this.switchRoom(e.target.value);
    } else {
      this.joinRoom(e.target.value);
    }
  }

  fetchRoom(roomName) {
    return new Promise((resolve) => {
      this.socketCli.fetchRoom(roomName, resolve);
    });
  }

  switchRoom(roomName) {
    const room = this.roomManager.getByName(roomName);

    this.setState({
      currentRoom: room,
      messages: room.chatHistory
    });
  }

  joinRoom(roomName) {
    this.socketCli.joinRoom(roomName, this.state.username, () => {

      this.fetchRoom(roomName)
        .then((room) => this.roomManager.add(room))
        .then((room) => {
          this.switchRoom(room.name);
        })
        .catch((e) => console.log(e));
    });
  }
}

ChatRoom.propTypes = {
  location: PropTypes.any
}

export default ChatRoom;
