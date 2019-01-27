class ClientManager {
  constructor() {
    this.clients = new Map();

    this.register = this.register.bind(this);
    this.registerName = this.registerName.bind(this);
    this.removeClients = this.removeClient.bind(this);
    this.getClientName = this.getClientName.bind(this);
  }

  register(client) {
    this.clients.set(client.id, {client});
  }

  registerName(id, username) {
    this.clients.get(id).username = username;
  }

  removeClient(user) {
    this.clients.delete(user.id);
  }

  getClientName(id) {
    return this.clients.get(id).username;
  }
}

module.exports = ClientManager;
