import React from 'react';
import PropTypes from 'prop-types';
import './room-users-list.css';



class RoomUsersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      members: this.props.members
    }

    this.onInvite = this.props.onInvite;

    this.updateList = this.updateList.bind(this);
  }

  render() {
    const members = this.state.members.map((member, i) => {
      return (
        <li
        key={i}
        onDoubleClick={((e) => {
          this.onInvite(e.target.innerText)
        }).bind(this)}
        >
          {member}
        </li>
      )})

    return (
      <ul className="users-list">Room users:
        {members}
      </ul>
    );
  }

  updateList(list) {
    this.setState({members: list});
  }
}

RoomUsersList.propTypes = {
  members: PropTypes.array,
  onInvite: PropTypes.func
}

export default RoomUsersList;
