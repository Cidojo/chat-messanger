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

  addMemberToRoom(member, roomID) {
    this.getRoomByID(roomID).addMember(member);
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

    throw new Error(`No such room`);
  }

  getRoomMembersByName(roomName) {
    return [...this.getRoomByName(roomName).getMembers().values()];
  }

  getRoomMembersByRoomID(roomID) {
    return [...this.getRoomByID(roomID).getMembers().values()].map((member) => member.name);
  }

  getRooms() {
    return [...this.rooms.values()].map((room) => room.name);
  }
}

module.exports = RoomManager;
