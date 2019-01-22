import React from 'react';
import ChatRoom from './chat-room';


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
      // Form was submitted, now join user to a chat
      return (
        <ChatRoom username={this.state.username} />
      );
    }

    return (
      <form onSubmit={this.usernameSubmitHandler} className="username-form">
        <h1>Introduce yourself</h1>
        <div>
          <input
            type="text"
            onChange={this.usernameChangeHandler}
            placeholder="Enter a username..."
            required />
        </div>
        <input type="submit" value="Join" />
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
