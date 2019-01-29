class ClientManager {
  constructor() {
    this.clients = new Map();
    this.registeredClients = new Map();
  }

  add(client) {
    try {
      this.isNameTaken
    } catch (e) {
      return e;
    }
    this.clients.set(client.id, {client});
  }

  delete(id) {
    this.clients.delete(id);
  }

  register(id, name) {
    if (this.isNameTaken(name)) {
      throw new Error(`Name taken`);
    }

    this.clients.get(id).name = name;
    this.registeredClients.set(id, this.clients.get(id));
  }

  isNameTaken(name) {
    const clients = this.clients.values();

// using for loop to quit func in proper time ( no need to iterate throught all map if found match )
    for (let i = 0; i < this.clients.size; i++) {
      if (clients.next().value.name === name) {
        return true;
      }
    }

    return false;
  }
}

module.exports = ClientManager;
