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
      rooms: [this.props.location.initialRoom],
      globalUserList: [],
      messages: this.props.location.initialRoom.chatHistory,
      currentRoomIndex: 0
    };

    this.roomUserList = React.createRef();
    this.globalUserList = React.createRef();


    this.updateMemberList = this.updateMemberList.bind(this);
    this.updateGlobalUserList = this.updateGlobalUserList.bind(this);
    this.postMessage = this.postMessage.bind(this);
    this.getMessage = this.getMessage.bind(this);
    this.invite = this.invite.bind(this);
    this.onChangeRoom = this.onChangeRoom.bind(this);
    this.handleChatScreenToggle = this.handleChatScreenToggle.bind(this);
    this.getCurrentRoom = this.getCurrentRoom.bind(this);
    this.onInvitationAccept = this.onInvitationAccept.bind(this);


    this.socketCli = this.props.location.socketCli;
    this.socketCli.getGlobalUserList(this.updateGlobalUserList);
    this.socketCli.onGetMessage(this.getMessage);
    this.socketCli.refreshGlobal(this.updateGlobalUserList);
    this.socketCli.refreshRoom(this.updateMemberList);
    this.socketCli.enterRoomHandler(this.onChangeRoom);
    this.socketCli.onNewUser(this.getMessage);
    this.socketCli.onInvitation(this.getMessage);
  }

  render() {
    return (
      <div className="chat-room">
        <ul className="chat-room__toggle-bar">
          {this.state.rooms.map((room , i) => {
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
                    defaultChecked={i === this.state.currentRoomIndex}
                  />
                </label>
              </li>
            )
          })}
        </ul>
        <div className="chat-room__window">
          <ul className="chat-room__list">
            <li className={`chat-room__item`}>
              <h3 className="chat-room__title">Chat Room: {this.getCurrentRoom().name}</h3>
              <div className="chat-room__container">
                <Messages messages={this.state.messages} onAccept={this.onInvitationAccept} />
                <ChatInput onPostMessage={this.postMessage} />
              </div>
              <RoomUsersList ref={this.roomUserList} members={this.getCurrentRoom().members} />
            </li>
          </ul>
        </div>
        <GlobalUsersList ref={this.globalUserList} users={this.state.globalUserList} self={this.state.username} onInvite={this.invite} />
      </div>
    );
  }

  getCurrentRoom() {
    return this.state.rooms[this.state.currentRoomIndex];
  }

  handleChatScreenToggle(e) {
    const currentRoomIndex = this.state.rooms.findIndex((room) => room.name === e.currentTarget.value);
    this.setState({currentRoomIndex});
  }

  postMessage(message) {
    this.socketCli.handlePostMessage(this.getCurrentRoom().name, message);
  }

  getMessage(message) {
    this.setState({messages: [...this.state.messages, message]});
  }

  updateMemberList(list) {
    this.setState({members: list});
    this.roomUserList.current.updateList(list);
  }

  updateGlobalUserList(list) {
    this.setState({globalUserList: list});
    this.globalUserList.current.updateList(list);
  }

  invite(to) {
    if(to !== this.state.username) {
      this.socketCli.handleInvite(to, this.getCurrentRoom().name);
    }
  }

  onInvitationAccept(e) {
    this.socketCli.onInvitationAccept(e.target.value, this.state.username, this.onChangeRoom);
  }

  onChangeRoom(room) {
    const rooms = this.state.rooms;
    const newIndex = rooms.length;

    rooms.push(room);

    this.setState({
      rooms,
      messages: room.chatHistory,
      currentRoomIndex: newIndex
    });
  }
}

ChatRoom.propTypes = {
  state: PropTypes.any,
  location: PropTypes.any,
  room: PropTypes.string
}

export default ChatRoom;
