const Room = require('./room.js');


class RoomManager {
  constructor() {
    this.rooms = new Map();
  }

  addRoom(id, name) {
    const room = new Room(name);
    this.rooms.set(id, room);

    return room;
  }

  deleteRoom(id) {
    this.rooms.delete(id);
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

  getRooms() {
    return [...this.rooms.values()].map((room) => room.name);
  }
}

module.exports = RoomManager;
