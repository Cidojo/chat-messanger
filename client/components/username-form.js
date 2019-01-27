import React from 'react';
import PropTypes from 'prop-types';
import './username-form.css';
import initSocketCli from './../socket';
import {withRouter} from 'react-router-dom';
const socket = initSocketCli();

window.socket = socket.client; // debugger for

class UsernameForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      username: null,
      submitted: false,
    }

    this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
    this.usernameSubmitHandler = this.usernameSubmitHandler.bind(this);
  }

  render() {
    return (
      <form className="username-form" onSubmit={this.usernameSubmitHandler}>
        <h2 className="username-form__title">{`Welcome to Dojo's chat-messenger`}</h2>
        <p>Enter your name down below and click join button to join a chat</p>
        <input className="username-form__input"
          name="username"
          type="text"
          placeholder="Enter your nickname..."
          onChange={this.usernameChangeHandler}
          required />
        <button className="btn username-form__submit" type="submit">Join</button>
      </form>
    );
  }

  usernameChangeHandler(event) {
    this.setState({username: event.target.value});
  }

  usernameSubmitHandler(evt) {
    evt.preventDefault();

    socket.registerNameHandler(this.state.username);
    socket.joinHandler(this.state.username);

    this.setState({
      submitted: true
    });

    this.props.history.push(`/chatroom/${this.state.username}`);
  }
}

UsernameForm.propTypes = {
  history: PropTypes.any
}

export default withRouter(UsernameForm);
