class ChatRoom {
  constructor() {
    this.members = new Map();
    this.chatHistory = [];

    this.broadcastMessage = this.broadcastMessage.bind(this);
    this.addEntry = this.addEntry.bind(this);
    this.getChatHistory = this.getChatHistory.bind(this);
    this.addUser = this.addUser.bind(this);
    this.removeUser = this.removeUser.bind(this);
    this.serialize = this.serialize.bind(this);
  }

  broadcastMessage(message) {
    this.members.forEach((member) => member.emit('message', message));
  }

  addEntry(entry) {
    this.chatHistory = this.chatHistory.concat(entry);
  }

  getChatHistory() {
    return this.chatHistory.slice();
  }

  addUser(client) {
    this.members.set(client.id, client);
  }

  removeUser(client) {
    this.members.delete(client.id);
  }

  serialize() {
    return {
      name,
      numMembers: this.members.size
    }
  }
}

export default ChatRoom;
