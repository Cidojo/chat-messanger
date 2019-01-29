import React from 'react';
// import io from 'socket.io-client';
// import Messages from './components/messages';
// import ChatInput from './components/chat-input';
// import UsersList from './components/users-list';

// const socket = io.connect('/');

// const onMessageReceivedHandler = (data) => {
  // data = JSON.parse(data);
// }

// socket.on('message', onMessageReceivedHandler);


class Chat extends React.Component {
  constructor(props) {
    super(props);

    // this.data = data;
    // this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  render() {
    return (
      <div className="chat-room">
        // <h3 className="chat-room__title">Chat Room: {this.state.name}</h3>
        // <div className="chat-room__container">
          // <Messages messages={this.state.messages} />
          // <ChatInput onSubmit={this.onSubmitHandler} />
        // </div>
        // <UsersList />
      </div>
    );
  }


  // onSubmitHandler(evt) {
    // const data = {
      // message: evt.target.value,
      // type: `user's`
    // }

    // socket.emit(JSON.stringify(data));
  // }
}

export default Chat;
