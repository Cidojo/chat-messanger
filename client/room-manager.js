class RoomManager {
  constructor() {
    this.rooms = new Map();
  }

  add(room) {
    if (this.rooms.has(room.name)) {
      return this.rooms.get(room.name);
    }

    this.rooms.set(room.name, room);
    return room;
  }

  getAll() {
    return [...this.rooms.values()];
  }

  getByName(roomName) {
    return this.rooms.get(roomName);
  }

  delete(roomName) {
    this.rooms.delete(roomName);
  }
}

export default RoomManager;
