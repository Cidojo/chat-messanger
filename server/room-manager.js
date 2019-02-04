const Room = require('./room.js');


class RoomManager {
  constructor() {
    this.rooms = new Map();

    this.addRoom = this.addRoom.bind(this);
    this.deleteRoom = this.deleteRoom.bind(this);
    this.getRoomByID = this.getRoomByID.bind(this);
    this.getRoomMembersByName = this.getRoomMembersByName.bind(this);
    this.getRooms = this.getRooms.bind(this);
    this.addMemberToRoom = this.addMemberToRoom.bind(this);
    this.getRoomMembersByRoomID = this.getRoomMembersByRoomID.bind(this);
    this.getRoomByName = this.getRoomByName.bind(this);
  }

  addRoom(id, name) {
    this.rooms.set(id, new Room(name));
  }

  deleteRoom(id) {
    this.rooms.delete(id);
  }

  addMemberToRoom(member, roomName) {
    this.getRoomByName(roomName).addMember(member);
  }

  deleteMemberFromRooms(user) {
    console.log(Object.keys(user.client.rooms));
    Object.keys(user.client.rooms).forEach((room, i) => {
      console.log(room);
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
    console.log(roomName);
    let roomsIterMap = this.rooms.values();
    for (let i = 0; i < this.rooms.size; i++) {
      let current = roomsIterMap.next().value;

      if (current.name === roomName) {
        return current;
      }
    }
  }

  getRoomMembersByName(roomName) {
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
