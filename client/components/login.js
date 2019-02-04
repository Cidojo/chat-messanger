import React from 'react';
import {Redirect} from 'react-router';
import PropTypes from 'prop-types';
import './login.css';
import initSocketCli from './../socket-cli.js';

class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      username: null,
      registered: false,
      nameAvailiability: true
    }

    this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
    this.usernameSubmitHandler = this.usernameSubmitHandler.bind(this);

    this.socketCli = initSocketCli();
  }

  render() {
    if (this.state.registered) {
      return <Redirect to={{
          pathname: `/chatroom`,
          username: this.state.username,
          initialRoom: this.state.initialRoom,
          socketCli: this.socketCli
      }} />;
    }

    return (
      <form className="username-form" onSubmit={this.usernameSubmitHandler}>
        <h2 className="username-form__title">{`Welcome to Dojo's chat-messenger`}</h2>
        <p>Enter your name down below and click join button to join a chat</p>
        <input id="username-form__input" className="username-form__input"
          name="username"
          type="text"
          placeholder="Enter your nickname..."
          onChange={this.usernameChangeHandler}
          required />
        {this.state.nameAvailiability ? null : <label htmlFor="username-form__input" className="username-form__label">name is taken, enter another one</label>}
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

  usernameSubmitHandler(evt) {
    evt.preventDefault();

    const getRegisterState = (nameAvailiabilityState, room) => {
      if (nameAvailiabilityState) {
        this.setState({
          registered: true,
          initialRoom: room
        });
      } else {
        this.setState({
          nameAvailiability: nameAvailiabilityState
        });
      }
    }

    this.socketCli.registerName(this.state.username, getRegisterState.bind(this));

  }
}

Login.propTypes = {
  history: PropTypes.any
}

export default Login;
