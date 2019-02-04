import React from 'react';
import PropTypes from 'prop-types';
import Messages from './messages';
import ChatInput from './chat-input';
import RoomUsersList from './room-users-list';
import GlobalUsersList from './global-users-list';
import './chat-room.css';

const chatRoomScript = (e) => {
  const chatTogglers = document.querySelectorAll(`.chat-room__toggle input`);
  const chatRooms = document.querySelectorAll(`.chat-room__item`);

  chatTogglers.forEach((toggle, i) => {
    toggle.addEventListener(`checked`, () => {
      chatRooms[i].classList.remove(`chat-room__item--hidden`);
      e.currentTarget.classList.add(`chat-room__item--hidden`);
    });
  });
}

class ChatRoom extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: this.props.location.defaultRoom,
      username: this.props.location.username,
      messages: [],
      members: [],
      globalUsers: [],
      currentChat: this.props.location.defaultRoom[0]
    };

    this.roomUserList = React.createRef();
    this.globalUserList = React.createRef();


    this.updateMembersList = this.updateMembersList.bind(this);
    this.updateGlobalUsersList = this.updateGlobalUsersList.bind(this);
    this.sendHandler = this.sendHandler.bind(this);
    this.addMessage = this.addMessage.bind(this);
    this.invite = this.invite.bind(this);
    this.onChangeRoom = this.onChangeRoom.bind(this);
    this.handleChatScreenToggle = this.handleChatScreenToggle.bind(this);


    this.socketCli = this.props.location.socketCli;
    this.socketCli.getRoomMembersList(this.state.currentChat, this.updateMembersList);
    this.socketCli.getGlobalUsersList(this.updateGlobalUsersList);
    this.socketCli.onMessageReceived(this.addMessage);
    this.socketCli.refreshGlobal(this.updateGlobalUsersList);
    this.socketCli.refreshRoom(this.updateMembersList);
    this.socketCli.enterRoomHandler(this.onChangeRoom);
    this.socketCli.onNewUser(this.addMessage);
  }

  render() {
    return (
      <main className="chat-room container">
      <ul className="chat-room__toggle-bar">
        {this.state.rooms.map((room , i) => {
          return (
            <li key={i} className="chat-room__toggle">
              <label>
                {room}
                <input
                  type="radio"
                  name="chat-room__toggle"
                  value={room}
                  onChange={this.handleChatScreenToggle}
                />
              </label>
            </li>
          )
        })}
      </ul>
      <ul className="chat-room__list">
        {this.state.rooms.map((room , i) => {
          return (
            <li key={i} className={room === this.state.currentChat ? `chat-room__item` : `chat-room__item--hidden`}>
              <h3 className="chat-room__title">Chat Room: {room}</h3>
              <div className="chat-room__container">
                <Messages messages={this.state.messages} />
                <ChatInput onSend={this.sendHandler} />
              </div>
            </li>
          )
        })}
        <RoomUsersList ref={this.roomUserList} members={this.state.members} />
        <GlobalUsersList ref={this.globalUserList} users={this.state.globalUsers} onInvite={this.invite} />
      </ul>
      </main>
    );
  }

  handleChatScreenToggle(e) {
    console.log(e.currentTarget.value);
    this.setState({currentChat: e.currentTarget.value});
  }

  sendHandler(message) {
    // Emit the message to the server
    this.socketCli.createMessageHandler(this.state.currentChat, message);
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
    this.socketCli.inviteHandler(to, this.state.currentChat);
  }

  onChangeRoom(room) {
    const rooms = this.state.rooms;
    rooms.push(room);
    this.setState({rooms});
  }
}

ChatRoom.propTypes = {
  state: PropTypes.any,
  location: PropTypes.any,
  room: PropTypes.string
}

export default ChatRoom;
