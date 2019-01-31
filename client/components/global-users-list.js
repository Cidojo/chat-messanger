import React from 'react';
import PropTypes from 'prop-types';
import './room-users-list.css';



class GlobalUsersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: this.props.users
    }

    this.onInvite = this.props.onInvite;

    this.updateList = this.updateList.bind(this);
  }

  render() {
    const users = this.state.users.map((user, i) => {
      return (
        <li
        key={i}
        onDoubleClick={((e) => {
          this.onInvite(e.target.innerText)
        }).bind(this)}
        >
          {user}
        </li>
      )})

    return (
      <ul className="users-list">Online users:
        {users}
      </ul>
    );
  }

  updateList(list) {
    this.setState({users: list});
  }
}

GlobalUsersList.propTypes = {
  users: PropTypes.array,
  onInvite: PropTypes.func
}

export default GlobalUsersList;
