const Room = require('./room.js');


class RoomManager {
  constructor() {
    this.rooms = new Set();

    this.add = this.add.bind(this);
    this.delete = this.delete.bind(this);
    this.getRooms = this.getRooms.bind(this);
  }

  add(name) {
    this.rooms.set(new Room(name));
  }

  delete(room) {
    this.rooms.delete(room);
  }

  getRooms() {
    return [...this.rooms.values()].map((room) => room.name);
  }
}

module.exports = RoomManager;
