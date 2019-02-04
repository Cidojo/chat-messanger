const moment = require('moment');

const MessageType = {
  SYSTEM: `system`,
  USER: `user`
};

const getFormattedMessage = (text, type) => {
  return {
    text,
    createdAt: `[${moment().format(`hh:mm:ss a`)}]`,
    type
  };
}

const makeHandlers = (client, clientManager, roomManager) => {

  const handleRegister = (name, cb) => {
    try {
      clientManager.register(client.id, name);
      cb(true);
    } catch (e) {
      cb(false);
    }

    const roomName = name;
    const roomID = client.id;

    roomManager.addRoom(roomID, roomName);
    client.join(roomName);
    roomManager.addMemberToRoom(clientManager.allUsers.get(client.id), roomName);

    const newUserFormattedMessage = getFormattedMessage(`User ${name} joined global chat...`, MessageType.SYSTEM);

    client.broadcast.emit(`message:new-user`, newUserFormattedMessage);
  }

  const handleGetMembers = (room, cb) => {
    cb(roomManager.getRoomMembersByName(room));
  }

  const handleGetUsers = (cb) => {
    cb(clientManager.getGlobalUsersList());
  }

  const handleInvite = (to, room) => {
    const user = clientManager.getUserByName(to);
    user.client.join(room);
    roomManager.getRoomByName(room).addMember(user);
    clientManager.getUserByName(to).client.emit(`enterRoom`, room);

  }

  const handlePostMessage = (roomName, text) => {
    const room = roomManager.getRoomByName(roomName);
    const formattedMessage = getFormattedMessage(text, MessageType.USER);
    formattedMessage.from = clientManager.getUserById(client.id).name;

    room.addEntry(formattedMessage);
    room.broadcastMessage(formattedMessage);
  }

  const handleDisconnect = () => {
    roomManager.deleteMemberFromRooms(clientManager.getUserById(client.id));
    clientManager.delete(client);

    console.log(`${client.id} has disconnected...`); // eslint-disable-line
  }

  return {
    handleRegister,
    handleGetMembers,
    handleGetUsers,
    handleInvite,
    handlePostMessage,
    handleDisconnect
  }
}

module.exports = makeHandlers;
