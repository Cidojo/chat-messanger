const Room = require('./room.js');

const defaultRoomName = `Global`;

class RoomManager {
  constructor() {
    this.rooms = new Map();

    this.add(defaultRoomName);
  }

  add(name) {
    if (this.rooms.has(name)) {
      return this.rooms.get(name);
    }

    const room = new Room(name);
    this.rooms.set(name, room);

    return room;
  }

  delete(name) {
    this.rooms.delete(name);
  }

  getByName(name) {
    return this.rooms.get(name);
  }

  getDefault() {
    return this.rooms.get(defaultRoomName);
  }

  getAll() {
    return [...this.rooms.values()].map((room) => room.name);
  }
}

module.exports = RoomManager;
