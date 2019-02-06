const moment = require('moment');

const MessageType = {
  SYSTEM: `system`,
  USER: `user`,
  INVITATION: `invitation`
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
    } catch (e) {
      cb(false);
    }

// for simplicity room props equals to user's name and id
    const roomName = name;
    const roomID = client.id;

    roomManager.addRoom(roomID, roomName);
    roomManager.addMemberToRoom(clientManager.allUsers.get(client.id), roomName);

    cb(true, roomManager.getRoomByID(roomID).getProps());

    const newUserFormattedMessage = getFormattedMessage(`User ${name} joined global chat...`, MessageType.SYSTEM);
    client.broadcast.emit(`message:new-user`, newUserFormattedMessage);
  }

  const handleGetUsers = (cb) => {
    cb(clientManager.getGlobalUsersList());
  }

  const handleInviteEmit = (invitedUserName, roomName) => {
    const emitter = clientManager.getUserById(client.id);
    const invitedUser = clientManager.getUserByName(invitedUserName);
    const formattedMessage = getFormattedMessage(`${emitter.name} invites you to join ${roomName} Chat...`, MessageType.INVITATION);
    formattedMessage.host = roomName;

    client.to(invitedUser.id).emit(`invite:query`, formattedMessage);
  }

  const handleInvitationAccept = (host, guest, cb) => {
    roomManager.addMemberToRoom(clientManager.getUserByName(guest), host);
    cb(roomManager.getRoomByName(host).getProps());
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
    handleGetUsers,
    handleInviteEmit,
    handlePostMessage,
    handleDisconnect,
    handleInvitationAccept
  }
}

module.exports = makeHandlers;
