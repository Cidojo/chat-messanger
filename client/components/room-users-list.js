import React from 'react';
import PropTypes from 'prop-types';
import './room-users-list.css';



class RoomUsersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      members: this.props.members
    }

    this.state.members;
    this.updateList = this.updateList.bind(this);
  }

  render() {
    const members = this.state.members.map((member, i) => {
      return (
        <li key={i}>{member}</li>
      )})

    return (
      <ul className="users-list">Online users:
        {members}
      </ul>
    );
  }

  updateList(list) {
    this.setState({members: list});
  }
}

RoomUsersList.propTypes = {
  members: PropTypes.array
}

export default RoomUsersList;
