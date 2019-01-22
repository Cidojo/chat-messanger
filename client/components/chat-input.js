import React from 'react';
import PropTypes from 'prop-types';

class ChatInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {chatInput: ''};

    this.textChangeHandler = this.textChangeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  render() {
      return (
        <form className="chat-input" onSubmit={this.submitHandler}>
          <input type="text"
            onChange={this.textChangeHandler}
            value={this.state.chatInput}
            placeholder="Write a message..."
            required />
        </form>
      );
  }

  textChangeHandler(event)  {
    this.setState({chatInput: event.target.value});
  }

  submitHandler(event) {
    // Stop the form from refreshing the page on submit
    event.preventDefault();

    // Call the onSend callback with the chatInput message
    this.props.onSend(this.state.chatInput);

    // Clear the input box
    this.setState({chatInput: ''});
  }
}

ChatInput.propTypes = {
  onSend: PropTypes.func
}

export default ChatInput;