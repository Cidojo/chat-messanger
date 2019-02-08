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

const makeHandlers = (io, client, clientManager, roomManager) => {


  const handleRegister = (name, cb) => {
    try {
      clientManager.registerClient(client.id, name);
    } catch (e) {
      cb(false);
    }
    // for simplicity room name & id equals to user's name & id
    const roomName = name;
    const roomID = client.id;

    const room = roomManager.addRoom(roomID, roomName);
    room.addMember(clientManager.getClientById(client.id));
    clientManager.addRoomToClient(client.id, room);

    cb(true, room.getProps());

    const newUserFormattedMessage = getFormattedMessage(`User ${name} joined global chat...`, MessageType.SYSTEM);
    client.broadcast.emit(`message:new-user`, newUserFormattedMessage);
  }


  const handlePostMessage = (roomName, text) => {
    const room = roomManager.getRoomByName(roomName);
    const formattedMessage = getFormattedMessage(text, MessageType.USER);

    formattedMessage.from = clientManager.getClientById(client.id).name;

    room.addEntry(formattedMessage);

    io.to(roomName).emit(`message:get`, roomName, formattedMessage);
  }


  const handleGetUsers = (cb) => {
    cb(clientManager.getRegisteredClientsList());
  }

  const handleFetchRoom = (roomName, cb) => {
    cb(roomManager.getRoomByName(roomName).getProps());
  }


  const handleInviteEmit = (invited, roomName) => {
    const invitingUser = clientManager.getClientById(client.id);
    const invitedUser = clientManager.getClientByName(invited);
    const formattedMessage = getFormattedMessage(`${invitingUser.name} invites you to join ${roomName} Chat Room...`, MessageType.INVITATION);
    formattedMessage.host = roomName;

    client.to(invitedUser.id).emit(`invite:query`, formattedMessage);
  }


  const handleInvitationAccept = (host, invited, cb) => {
    const room = roomManager.getRoomByName(host);

    room.addMember(clientManager.getClientByName(invited));
    cb(room.getProps());
  }


  const handleDisconnect = () => {
    clientManager.getClientById(client.id).rooms.forEach((room) => {
      room.deleteMember(client.id);
    });

    clientManager.deleteClient(client.id);

    console.log(`${client.id} has disconnected...`); // eslint-disable-line
  }

  return {
    handleRegister,
    handleGetUsers,
    handleInviteEmit,
    handlePostMessage,
    handleDisconnect,
    handleInvitationAccept,
    handleFetchRoom
  }
}

module.exports = makeHandlers;
