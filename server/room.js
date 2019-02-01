class Room {
  constructor(name) {
    this.name = name;
    this.members = new Map();
    this.chatHistory = [];

    this.broadcastMessage = this.broadcastMessage.bind(this);
    this.addEntry = this.addEntry.bind(this);
    this.getChatHistory = this.getChatHistory.bind(this);
    this.addMember = this.addMember.bind(this);
    this.deleteMember = this.deleteMember.bind(this);
    this.getMemberList = this.getMemberList.bind(this);
  }

  broadcastMessage(message) {
    this.members.forEach((member) => {
      member.client.emit(`message:get`, message);
    });
  }

  addEntry(entry) {
    this.chatHistory.push(entry);
  }

  getChatHistory() {
    return this.chatHistory.slice()
  }

  addMember(member) {
    this.members.set(member.id, member);
  }

  deleteMember(id) {
    this.members.delete(id);
  }

  getMemberList() {
    return [...this.members.values()].map((member) => member.name);
  }
}

module.exports = Room;
