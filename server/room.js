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

  addEntry(entry) {
    this.chatHistory.push(entry);
  }

  getChatHistory() {
    return this.chatHistory.slice()
  }

  addMember(member) {
    this.members.set(member.id, member);
    this.refreshMembersList(member.client);
  }

  deleteMember(member) {
    this.members.delete(member.id);
    this.refreshMembersList(member.client);
  }

  getMembers() {
    return this.members;
  }

  getMembersList() {
    return [...this.members.values()].map((member) => member.name);
  }

  refreshMembersList(client) {
    client.to(this.name).emit(`refresh:room`, this.getMemberList());
  }
}

module.exports = Room;
