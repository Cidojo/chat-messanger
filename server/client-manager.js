class ClientManager {
  constructor() {
    this.allClients = new Map();
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
  }

  registerClient(id, name) {
    if (this.isNameTaken(name)) {
      throw new Error(`Name taken`);
    }

    this.getClientById(id).name = name;
  }

  getClientByName(name) {
    return this.getRegisteredClients(name).find((client) => client.name === client);
  }

  getClientById(id) {
    return this.allClients.get(id);
  }

  addRoomToClient(id, room) {
    this.getClientById(id).rooms.add(room);
  }

  getAllClients() {
    return [...this.allClients.values()];
  }

  getRegisteredClients() {
    return this.getAllClients().filter((client) => {
      return client.name;
    });
  }

  getRegisteredClientsList() {
    return this.getRegisteredClients().map((client) => {
      return client.name;
    });
  }

  isNameTaken(name) {
    return this.getRegisteredClients().some((client) => client.name === name);
  }
}

module.exports = ClientManager;
