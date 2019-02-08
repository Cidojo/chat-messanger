class RoomManager {
  constructor() {
    this.rooms = new Set();
  }

  addRoom(room) {
    this.rooms.add(room);
  }

  getRooms() {
    return [...this.rooms];
  }

  getRoom(roomName) {
    return this.getRooms().find((room) => room.name === roomName);
  }

  deleteRoom(roomName) {
    this.rooms.delete(this.getRoom(roomName));
  }
}

export default RoomManager;
