import React from 'react';
import {Redirect} from 'react-router';
import './login.css';
import initSocketCli from './../socket-cli.js';

class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      username: null,
      chatname: ``,
      room: {
        name: ``,
        members: new Map(),
        chatHistory: []
      },
      registered: false,
      nameAvailiability: true
    }

    this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
    this.usernameSubmitHandler = this.usernameSubmitHandler.bind(this);
    this.chatnameChangeHandler = this.chatnameChangeHandler.bind(this);

    this.socketCli = initSocketCli();
  }

  render() {
    if (this.state.registered) {
      return <Redirect to={{
          pathname: `/chatroom`,
          username: this.state.username,
          chatname: this.state.chatname,
          room: this.state.room,
          socketCli: this.socketCli
      }} />;
    }

    return (
      <form className="username-form" onSubmit={this.usernameSubmitHandler}>
        <h2 className="username-form__title">{`Welcome to Dojo's chat-messenger`}</h2>
        <p>Enter your name down below and click join button to join a chat</p>
        <input id="username-form__input"
          className="username-form__input"
          name="username"
          type="text"
          placeholder="Enter your nickname..."
          onChange={this.usernameChangeHandler}
          required
        />
        {this.state.nameAvailiability ? null : <label htmlFor="username-form__input" className="username-form__label">name is taken, enter another one</label>}
        <input id="username-form__chatname"
          className="username-form__chatname"
          name="chatname"
          type="text"
          placeholder="Enter chat name..."
          onChange={this.chatnameChangeHandler}
        />
        <button className="btn username-form__submit" type="submit">Join</button>
      </form>
    );
  }

  usernameChangeHandler(event) {
    this.setState({
      username: event.target.value,
      nameAvailiability: true
    });
  }

  chatnameChangeHandler(event) {
    this.setState({
      chatname: event.target.value,
    });
  }

  usernameSubmitHandler(evt) {
    evt.preventDefault();

    const onRegisterAnswer = (nameAvailiabilityState, room) => {
      if (nameAvailiabilityState) {
        this.setState({
          registered: true,
          room
        });
      } else {
        this.setState({
          nameAvailiability: nameAvailiabilityState
        });
      }
    }

    this.socketCli.registerName(this.state.username, this.state.chatname, onRegisterAnswer.bind(this));

  }
}

export default Login;
