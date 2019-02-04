class Room {
  constructor(name) {
    this.name = name;
    this.members = new Map();
    this.chatHistory = [];
  }

  getProps() {
    return {
      name: this.name,
      members: this.getMemberList(),
      chatHistory: this.getChatHistory()
    }
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
    this.refreshMemberList(member.client);
  }

  deleteMember(member) {
    this.members.delete(member.id);
    this.refreshMemberList(member.client);
  }

  getMemberList() {
    return [...this.members.values()].map((member) => member.name);
  }

  refreshMemberList(client) {
    client.to(this.name).emit(`refresh:room`, this.getMemberList());
  }
}

module.exports = Room;
