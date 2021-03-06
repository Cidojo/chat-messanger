import React from 'react';
import PropTypes from 'prop-types';

class ChangeRoomDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      roomName: ``
    }

    this.openDialog = this.openDialog.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  render() {
    return (
      <div>
        <button className="change-room-dialog__toggle" onClick={this.openDialog}>Change Room</button>
        <div className="change-room-dialog">
          <form onSubmit={this.submitHandler}>
            <input className="chat-input"
              type="text"
              onChange={this.changeHandler}
              value={this.state.roomName}
              placeholder="enter room name you wish to create..."
              required />
            <button>Create</button>
          </form>
          <ul className="change-room-dialog__availiable"></ul>
        </div>
      </div>
    )
  }

  changeHandler(e) {
    this.setState({
      roomName: e.target.value
    })
  }

  submitHandler(e) {
    e.preventDefault();

    this.props.joinRoomHandler(this.state.roomName);

    this.setState({roomName: ``});
  }

  openDialog() {

  }
}

ChangeRoomDialog.propTypes = {
  joinRoomHandler: PropTypes.func
}

export default ChangeRoomDialog;
