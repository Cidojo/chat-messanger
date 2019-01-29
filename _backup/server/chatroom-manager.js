class ChatroomManager {
  constructor() {
    this.chatrooms = new Map();
  }

  addChatroom(name, room) {
    this.chatrooms.set(name, room);
  }

  removeClient(client) {
    this.chatrooms.forEach((room) => room.removeUser(client));
  }

  getChatroomByName(chatroomName) {
    return this.chatrooms.get(chatroomName);
  }

  serializeChatrooms() {
    return Array.from(this.chatrooms.values()).map((room) => room.serialize());
  }
}

module.exports = ChatroomManager;
