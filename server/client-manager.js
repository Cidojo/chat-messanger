class ClientManager {
  constructor() {
    this.allUsers = new Map();
    this.registeredUsers = new Map();

    this.isNameTaken = this.isNameTaken.bind(this);
    this.register = this.register.bind(this);
  }

  add(client) {
    this.allUsers.set(client.id, {client, id: client.id});
  }

  delete(id) {
    this.allUsers.delete(id);
    this.registeredUsers.delete(id);
  }

  register(id, name) {
    if (this.isNameTaken(name)) {
      throw new Error(`Name taken`);
    }

    const user = this.allUsers.get(id);

    user.name = name;

    this.registeredUsers.set(id, user);
  }

  isNameTaken(name) {
    return [...this.allUsers.values()].some((user) => user.name === name);
  }

  getAllUsers() {
    return [...this.allUsers.values()].map((user) => {
      return {
        id: user.id,
        name: user.name || `not registered`
      }
    });
  }

  getRegisteredUsers() {
    return [...this.registeredUsers.values()].map((user) => {
      return {
        id: user.id,
        name: user.name
      }
    });
  }

  getGlobalUsersList() {
    return [...this.registeredUsers.values()].map((user) => user.name);
  }

  getUserByName(name) {
    let userIterMap = this.registeredUsers.values();

    for (let i = 0; i < this.registeredUsers.size; i++) {
      let current = userIterMap.next().value;

      if (current.name === name) {
        return current;
      }
    }

    throw new Error(`No such room`);
  }

  getUserById(id) {
    return this.allUsers.get(id);
  }
}

module.exports = ClientManager;
