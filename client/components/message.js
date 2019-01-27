import React from 'react';
import PropTypes from 'prop-types';
import './message.css';

class Message extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
      return (
        <li className="message">
          <span className={`message__username`}>
            {[this.props.createdAt, this.props.username].join(`---`)}:&nbsp;
          </span>

          <span className="message__body">
            {this.props.body}
          </span>
        </li>
      );
    }
  }

  Message.propTypes = {
    createdAt: PropTypes.string,
    body: PropTypes.string,
    username: PropTypes.string,
  }

  export default Message;
