class Room {
  constructor(id, name) {
    this.name = name;
    this.members = new Map();
    this.chatHistory = [];
    this.id = id;
  }

  getProps() {
    return {
      name: this.name,
      members: this.getMembersList(),
      chatHistory: this.getChatHistory()
    }
  }

  addEntry(entry) {
    this.chatHistory.push(entry);
  }

  getChatHistory() {
    return this.chatHistory.slice()
  }

  addMember(member) {
    this.members.set(member.id, member);
    member.client.join(this.name);
  }

  deleteMember(id) {
    this.members.get(id).client.leave(this.name);
    this.members.delete(id);
  }

  getMembers() {
    return this.members;
  }

  getMembersList() {
    return [...this.members.values()].map((member) => member.name);
  }
}

module.exports = Room;
