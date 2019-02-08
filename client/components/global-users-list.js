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
    const users = this.props.usersList.slice(0).map((user, i) => {
      return (
        <li
        key={i}
        className="global-users__item"
        >
          {user}
          {this.state.self === user ? `` : <button onClick={this.props.handleInvite.bind(null, user)}>invite</button>}
        </li>
      )})

    return (
      <ul className="global-users__list">Online users:
        {users}
      </ul>
    );
  }
}

GlobalUsersList.propTypes = {
  usersList: PropTypes.array,
  handleInvite: PropTypes.func,
  self: PropTypes.string
}

export default GlobalUsersList;
