import React from 'react';
import './../style/user-name-input.css';
import {hot} from 'react-hot-loader';

class UserNameInput extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="user-data">
        <input className="user-data__name" type="text" name="name" defaultValue="" placeholder="Enter your name!"></input>
        <button className="user-data__submit" type="button" name="button">Let me chat!</button>
      </div>
    );
  }
}

export default hot(module)(UserNameInput);
