const Room = require('./room.js');


class RoomManager {
  constructor() {
    this.rooms = new Map();
  }

  addRoom(id, name) {
    this.rooms.set(id, new Room(name));
  }

  deleteRoom(id) {
    this.rooms.delete(id);
  }

  addMemberToRoom(member, roomName) {
    member.client.join(roomName);
    this.getRoomByName(roomName).addMember(member);
  }

  deleteMemberFromRooms(user) {
    Object.keys(user.client.rooms).forEach((room, i) => {
      const chat = this.getRoomByName(room);
      if (i > 0) {
        chat.deleteMember(chat.members.get(user.client.id));
      }
    });
  }

  getRoomByID(id) {
    return this.rooms.get(id);
  }

  getRoomByName(roomName) {
    let roomsIterMap = this.rooms.values();
    for (let i = 0; i < this.rooms.size; i++) {
      let current = roomsIterMap.next().value;

      if (current.name === roomName) {
        return current;
      }
    }
  }

  getRoomMembersByRoomName(roomName) {
    return [...this.getRoomByName(roomName).getMemberList().values()];
  }

  getRoomMembersByRoomID(roomID) {
    return [...this.getRoomByID(roomID).getMemberList().values()].map((member) => member.name);
  }

  getRooms() {
    return [...this.rooms.values()].map((room) => room.name);
  }
}

module.exports = RoomManager;
