import React from 'react';
import PropTypes from 'prop-types';
import './global-users-list.css';



class GlobalUsersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      self: this.props.self
    }
  }

  render() {
    const users = this.props.users.slice(0).map((user, i) => {
      return (
        <li
        key={i}
        className="global-users__item"
        >
          {user}
          {this.state.self === user ? `` : <button onClick={this.invite.bind(this, user)}>invite</button>}
        </li>
      )})

    return (
      <ul className="global-users__list">Online users:
        {users}
      </ul>
    );
  }

  invite(user) {
    this.props.handleInvite(user);
  }
}

GlobalUsersList.propTypes = {
  users: PropTypes.array,
  handleInvite: PropTypes.func,
  self: PropTypes.string
}

export default GlobalUsersList;
