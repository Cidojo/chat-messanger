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
        <button
          className="change-room-dialog__toggle"
          onClick={this.openDialog}
        >
          Change Room
        </button>
        <div className="change-room-dialog">
          <form onSubmit={this.submitHandler}>
            <input
              type="text"
              placeholder="enter room name you wish to create..."
              onChange={this.changeHandler}
            />
            <button>
              Create
            </button>
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

    e.target.value = ``;
  }

  openDialog() {

  }
}

ChangeRoomDialog.propTypes = {
  joinRoomHandler: PropTypes.func
}

export default ChangeRoomDialog;
