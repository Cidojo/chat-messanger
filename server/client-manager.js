class ClientManager {
  constructor() {
    this.allClients = new Map();

    this.isNameTaken = this.isNameTaken.bind(this);
    this.register = this.register.bind(this);
  }

  addClient(client) {
    this.allClients.set(client.id, {
      client,
      id: client.id,
      rooms: new Set()
    });
  }

  deleteClient(id) {
    this.allClients.delete(id);
    this.refreshGlobalUserList(this.getClientById(id));
  }

  registerClient(id, name) {
    if (this.isNameTaken(name)) {
      throw new Error(`Name taken`);
    }

    const user = this.getClientById(id);
    user.name = name;
    this.registeredUsers.set(id, user);

    this.refreshGlobalUserList(user.client);
  }

  getClientByName(name) {
    let userIterMap = this.registeredUsers.values();

    for (let i = 0; i < this.registeredUsers.size; i++) {
      let current = userIterMap.next().value;

      if (current.name === name) {
        return current;
      }
    }

    throw new Error(`No such client`);
  }

  getClientById(id) {
    return this.allClients.get(id);
  }

  addRoomToClient(id, room) {
    this.getClientById.rooms.add(room);
  }

  getRegisteredClients() {
    return this.getAllClients().filter((client) => {
      return client.name;
    });
  }

  isNameTaken(name) {
    return this.getRegisteredClients().some((client) => client.name === name);
  }
}

module.exports = ClientManager;
