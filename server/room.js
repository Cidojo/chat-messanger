const makeHandlers = () => {
  const createMessageHandler = () => {
  }
}

class Room {
  constructor(name) {
    this.room = {
      name,
      members: new Set()
    }
  }

  addMember(name) {
    this.members.set(name);
  }

  deleteMember(name) {
    this.members.delete(name);
  }

  getMembers() {
    return [...this.members];
  }
}

module.exports = Room;
