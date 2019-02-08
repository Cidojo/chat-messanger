class Room {
  constructor(name) {
    this.name = name;
    this.members = new Map();
    this.chatHistory = [];
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
  }

  deleteMember(id) {
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
