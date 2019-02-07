import React from 'react';
import PropTypes from 'prop-types';
import Messages from './messages';
import ChatInput from './chat-input';
import RoomUsersList from './room-users-list';
import GlobalUsersList from './global-users-list';
import ServerData from './server-data';
import './chat-room.css';


class ChatRoom extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: this.props.location.username,
      room: this.props.location.initialRoom,
      rooms: [this.props.location.initialRoom.name],
      globalUserList: [],
      currentRoomIndex: 0,
      serverData: {
        users: {
          connected: [],
          registered: []
        },
        rooms: []
      }
    };

    this.roomUserList = React.createRef();
    this.globalUserList = React.createRef();

    this.updateMemberList = this.updateMemberList.bind(this);
    this.updateGlobalUserList = this.updateGlobalUserList.bind(this);

    this.postMessage = this.postMessage.bind(this);
    this.getUserMessage = this.getUserMessage.bind(this);
    this.getSystemMessage = this.getSystemMessage.bind(this);

    this.handleInvite = this.handleInvite.bind(this);
    this.handleChangeRoom = this.handleChangeRoom.bind(this);
    this.handleChatScreenToggle = this.handleChatScreenToggle.bind(this);
    this.onInvitationAccept = this.onInvitationAccept.bind(this);

    this.onServerData = this.onServerData.bind(this);


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
    const toggleBar = this.state.rooms.slice(0).map((roomName, i) => {
        return (
          <li key={i} className="chat-room__toggle">
            <label>
              {roomName}
              <input
                type="radio"
                name="chat-room__toggle"
                className="visually-hidden"
                value={roomName}
                onChange={this.handleChatScreenToggle}
                checked={i === this.state.currentRoomIndex}
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
              <h3 className="chat-room__title">Chat Room: {this.state.room.name}</h3>
              <div className="chat-room__container">
                <Messages messages={this.state.room.chatHistory} onAccept={this.onInvitationAccept} />
                <ChatInput onPostMessage={this.postMessage} />
              </div>
              <RoomUsersList ref={this.roomUserList} members={this.state.room.members} />
            </li>
          </ul>
        </div>
        <GlobalUsersList ref={this.globalUserList} users={this.state.globalUserList} self={this.state.username} handleInvite={this.handleInvite} />
        <ServerData serverData={this.state.serverData} />
      </div>
    );
  }

  onServerData(serverData) {
    this.setState({
      serverData
    })
  }

  handleChatScreenToggle(e) {
    this.socketCli.fetchRoom(e.target.value, (room) => this.setState({
      room,
      currentRoomIndex: this.state.rooms.indexOf(room.name)
    }));
  }

  postMessage(message) {
    this.socketCli.postMessage(this.state.room.name, message);
  }

  getUserMessage(room) {
    const roomIndex = this.state.rooms.indexOf(room.name);

    if (roomIndex === this.state.currentRoomIndex) {
      this.setState({
        room
      });
    }
  }

  getSystemMessage(message) {
    const rooms = this.state.rooms.slice(0);
    rooms.forEach((room) => room.chatHistory.push(message));

    this.setState({
      messages: [...this.state.messages, message],
      rooms
    });
  }

  updateMemberList(list) {
    this.setState({members: list});
    this.roomUserList.current.updateList(list);
  }

  updateGlobalUserList(list) {
    this.setState({globalUserList: list});
    this.globalUserList.current.updateList(list);
  }

  handleInvite(to) {
    if(to !== this.state.username) {
      this.socketCli.invite(to, this.room.name);
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
  state: PropTypes.any,
  location: PropTypes.any,
  room: PropTypes.string
}

export default ChatRoom;
