class ClientManager {
  constructor() {
    this.allClients = new Map();
    this.registeredClients = new Map();

    this.isNameTaken = this.isNameTaken.bind(this);
    this.register = this.register.bind(this);
  }

  add(client) {
    this.allClients.set(client.id, {client});
  }

  delete(id) {
    this.allClients.delete(id);
    this.registeredClients.delete(id);
  }

  register(id, name) {
    if (this.isNameTaken(name)) {
      throw new Error(`Name taken`);
    }
    this.allClients.get(id).name = name;
    this.registeredClients.set(id, this.allClients.get(id));
  }

  isNameTaken(name) {
    return [...this.allClients.values()].some((client) => client.name === name);
  }

  getAllClients() {
    return [...this.allClients.values()].map((client) => {
      return {
        id: client.client.id,
        username: client.name || `not registered`
      }
    });
  }

  getRegisteredClients() {
    return [...this.registeredClients.values()].map((client) => {
      return {
        id: client.client.id,
        username: client.name
      }
    });
  }
}

module.exports = ClientManager;
