import React, { Component } from "react";

class UsersOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [
        { id: 1, name: "user 1" },
        { id: 2, name: "user 2" },
        { id: 3, name: "user 3" },
        { id: 4, name: "user 4" },
        { id: 5, name: "user 5" },
      ],
    };
  }
  render() {
    return (
      <ul>
        {this.state.users.map((user) => (
          <li key={user.name}>{user.name}</li>
        ))}
      </ul>
    );
  }
}

export default UsersOverview;
