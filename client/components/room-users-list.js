import React from 'react';
import PropTypes from 'prop-types';
import './room-users-list.css';



class RoomUsersList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const members = this.props.members.map((member, i) => {
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
      <ul className="room-users__list">Room users:
        {members}
      </ul>
    );
  }
}

RoomUsersList.propTypes = {
  members: PropTypes.array,
}

export default RoomUsersList;
