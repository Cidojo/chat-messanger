class ClientManager {
  constructor() {
    this.clients = new Map();

    this.registerClient = this.registerClient.bind(this);
    this.addClient = this.addClient.bind(this);
  }

  addClient(client) {
    this.clients.set(client.id, {client})
  }

  registerClient(client, username) {
    const usernameAvailiability = !([...this.clients.values()].map((c) => c.username).includes(username));

    if (usernameAvailiability) {
      this.clients.get(client.id).username =  username;
    }

    return usernameAvailiability;
  }

  removeClient(client) {
    this.clients.delete(client.id)
  }

}

module.exports = ClientManager;
