import React from 'react';
import ChatRoom from './chat-room';
import './username-form.css';
import clientSocket from './../client-socket';


class UsernameForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      username: null,
      submittet: false,
      client: clientSocket(),
      chatrooms: null
    }

    // fix 'this' to handlers
    this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
    this.usernameSubmitHandler = this.usernameSubmitHandler.bind(this);
  }

  render() {
    if (this.state.submitted) {
      // Form was submitted, now join user to a default chat
      return (
        <ChatRoom state={this.state} />
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
    // console.log(this.state.username);
  }

  usernameSubmitHandler(event) {
    event.preventDefault();

    this.state.client.registerQuery(this.state.username);
    this.state.client.registerHandler((success) => {
      if (success) {
        this.setState({submitted: true});
      } else {
        alert('This name is taken, please choose another name')
      }

    });
  }
}

export default UsernameForm;
