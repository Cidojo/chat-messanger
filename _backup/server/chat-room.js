class ChatRoom {
  constructor(name) {
    this.name = name;
    this.members = new Map();
    this.chatHistory = [];
  }

  broadcastMessage(message) {
    this.members.forEach((memeber) => memeber.emit('message', message));
  }

  addEntry(entry) {
    this.chatHistory = [...this.chatHistory, ...entry];
  }

  addUser(client) {
    this.members.set(client.id, client);
  }

  removeUser(client) {
    this.members.delete(client.id);
  }

  get chatHistory() {
    return this.chatHistory;
  }

  serialize() {
    return {
      name,
      numMembers: this.members.size
    }
  }
}
