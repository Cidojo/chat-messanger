class Room {
  constructor(name) {
    this.name = name;
    this.members = new Map();

    this.addMember = this.addMember.bind(this);
    this.deleteMember = this.deleteMember.bind(this);
    this.getMembers = this.getMembers.bind(this);
  }

  addMember(member) {
    this.members.set(member.id, member);
  }

  deleteMember(id) {
    this.members.delete(id);
  }

  getMembers() {
    return [...this.members.values()].map((member) => member.name);
  }
}

module.exports = Room;
