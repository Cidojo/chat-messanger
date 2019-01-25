import React from 'react';
import PropTypes from 'prop-types';
import './users-list.css';



class UsersList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul className="users-list">
        <li>Online users:</li>
      </ul>
    );
  }
}

export default UsersList;
