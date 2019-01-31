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
      nameAvailiable: true,
    }

    this.socketCli = initSocketCli(`/app`);
    window.socket = this.socketCli;

    this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
    this.usernameSubmitHandler = this.usernameSubmitHandler.bind(this);
  }

  render() {
    if (this.state.registered) {
      return <Redirect to={{
          pathname: `/chatroom`,
          username: this.state.username,
          defaultRoom: this.state.username,
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
        {this.state.nameAvailiable ? null : <label htmlFor="username-form__input" className="username-form__label">name is taken, enter another one</label>}
        <button className="btn username-form__submit" type="submit">Join</button>
      </form>
    );
  }

  usernameChangeHandler(event) {
    this.setState({
      username: event.target.value,
      nameAvailiable: true
    });
  }

  usernameSubmitHandler(evt) {
    evt.preventDefault();

    const getRegisterState = (flag) => {
      if (flag) {
        this.setState({
          registered: true
        });
      } else {
        this.setState({
          nameAvailiable: false
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
