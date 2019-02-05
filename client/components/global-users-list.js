import React from 'react';
import PropTypes from 'prop-types';
import './global-users-list.css';



class GlobalUsersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      self: this.props.self,
      users: this.props.users
    }

    this.updateList = this.updateList.bind(this);
  }

  render() {
    const users = this.state.users.slice(0).map((user, i) => {
      return (
        <li
        key={i}
        className="global-users__item"
        >
          {user}
          {this.state.self === user ? `` : <button onClick={this.onInvite.bind(this, user)}>invite</button>}
        </li>
      )})

    return (
      <ul className="global-users__list">Online users:
        {users}
      </ul>
    );
  }

  onInvite(user) {
    this.props.onInvite(user);
  }

  updateList(list) {
    this.setState({users: list});
  }
}

GlobalUsersList.propTypes = {
  users: PropTypes.array,
  onInvite: PropTypes.func,
  self: PropTypes.string
}

export default GlobalUsersList;
