import React from 'react';
import './username-form.css';
import initSocketCli from './../socket';

initSocketCli();

class UsernameForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      username: null,
      submittet: false,
      chatrooms: null
    }

    // this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
    // this.usernameSubmitHandler = this.usernameSubmitHandler.bind(this);
  }

  render() {
    if (this.state.submitted) {
      return (
        // <ChatRoom state={this.state} />
        <p></p>
      );
    }

    return (
      <form className="username-form">
        <h2 className="username-form__title">{`Welcome to Dojo's chat-messenger`}</h2>
        <p>Enter your name down below and click join button to join main chat</p>
        <input className="username-form__input"
          type="text"
          placeholder="Enter your nickname..."
        required />
        <button className="btn username-form__submit" type="submit">Join</button>
      </form>
    );
  }
}

export default UsernameForm;
