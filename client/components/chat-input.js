import React from 'react';
import PropTypes from 'prop-types';
import './chat-input.css';

class ChatInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {chatInput: ''};

    this.textChangeHandler = this.textChangeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  render() {
      return (
        <form className="chat-input__container" onSubmit={this.submitHandler}>
          <input className="chat-input" type="text"
            onChange={this.textChangeHandler}
            value={this.state.chatInput}
            placeholder="Write a message..."
            required />
        </form>
      );
  }

  textChangeHandler(evt)  {
    this.setState({chatInput: evt.target.value});
  }

  submitHandler(evt) {
    // Stop the form from refreshing the page on submit
    evt.preventDefault();

    // Call the onSend callback with the chatInput message
    if (this.state.chatInput) {
      this.props.onSubmit(this.state.chatInput);
      // Clear the input box
      this.setState({chatInput: ''});
    }
  }
}

ChatInput.propTypes = {
  onSubmit: PropTypes.func
}

export default ChatInput;
