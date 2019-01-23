import React from 'react';
import ChatRoom from './chat-room';
import './username-form.css';

class UsernameForm extends React.Component {
  constructor(props) {
    super(props)

    // setting initial username of empty string
    this.state = {username: ''};

    // fixing 'this' to handlers
    this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
    this.usernameSubmitHandler = this.usernameSubmitHandler.bind(this);
  }

  render() {
    if (this.state.submitted) {
      // Form was submitted, now join user to a default chat
      return (
        <ChatRoom username={this.state.username} chatRoomName={`Global`} />
      );
    }

    return (
      <form onSubmit={this.usernameSubmitHandler} className="username-form">
        <h2 className="username-form__title">Welcome to our chat-messenger</h2>
        <p>Enter your name down below and click join button to join main chat</p>
        <input className="username-form__input"
          type="text"
          onChange={this.usernameChangeHandler}
          placeholder="Enter your nickname..."
        required />
        <button className="btn username-form__submit" type="submit">Join</button>
      </form>
    );
  }

  usernameChangeHandler(event) {
    this.setState({username: event.target.value});
  }

  usernameSubmitHandler(event) {
    event.preventDefault();
    this.setState({submitted: true, username: this.state.username});
  }
}

export default UsernameForm;
