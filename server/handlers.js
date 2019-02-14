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

  const updateMembersList = (room) => {
    client.broadcast.to(room.name).emit(`refresh:room`, room.getMembersList());
  }

  const updateGlobalUsersList = () => {
    client.broadcast.emit(`refresh:global`, clientManager.getRegisteredClientsList());
  }

  const handleRegister = (name, roomName, cb) => {
    try {
      clientManager.registerClient(client.id, name);
    } catch (e) {
      cb(false);
    }

    const room = roomName ? roomManager.add(roomName) : roomManager.getDefault();
    room.addMember(clientManager.getClientById(client.id));
    clientManager.addRoomToClient(client.id, room);

    cb(true, room.getProps());

    const newUserFormattedMessage = getFormattedMessage(`User ${name} joined global chat...`, MessageType.SYSTEM);
    client.broadcast.emit(`message:userlist-change`, newUserFormattedMessage);
    updateMembersList(room);
    updateGlobalUsersList();
  }


  const handlePostMessage = (roomName, text) => {
    const room = roomManager.getByName(roomName);
    const formattedMessage = getFormattedMessage(text, MessageType.USER);

    formattedMessage.from = clientManager.getClientById(client.id).name;

    room.addEntry(formattedMessage);

    io.to(roomName).emit(`message:get`, roomName, formattedMessage);
  }


  const handleGetUsers = (cb) => {
    cb(clientManager.getRegisteredClientsList());
  }

  const handleFetchRoom = (roomName, cb) => {
    cb(roomManager.getByName(roomName).getProps());
  }


  const handleInviteEmit = (invited, roomName) => {
    const invitingUser = clientManager.getClientById(client.id);
    const invitedUser = clientManager.getClientByName(invited);
    const formattedMessage = getFormattedMessage(`${invitingUser.name} invites you to join ${roomName} Chat Room...`, MessageType.INVITATION);
    formattedMessage.host = roomName;

    client.to(invitedUser.id).emit(`invite:query`, formattedMessage);
  }


  const handleInvitationAccept = (host, invited, cb) => {
    const user = clientManager.getClientByName(invited);
    // const onUserJoinFormattedMessage = getFormattedMessage(`User ${user.name} has joined the room...`, MessageType.SYSTEM);

    const room = roomManager.getByName(host);

    room.addMember(user);
    cb(room.getProps());
    updateMembersList(room);
    // user.client.broadcast.to(host).emit(`message:userlist-change`, onUserJoinFormattedMessage);
  }

  const handleLeaveRoom = (roomName) => {
    const room = roomManager.getByName(roomName);
    room.deleteMember(client.id);
    updateMembersList(room);
  }

  const handleDisconnect = () => {
    const user = clientManager.getClientById(client.id);
    const onUserLeftFormattedMessage = getFormattedMessage(`User ${user.name} has left the room...`, MessageType.SYSTEM);

    user.rooms.forEach((room) => {
      room.deleteMember(client.id);

      if (!room.members.size && room.name !== roomManager.getDefault().name) {
        roomManager.delete(room.name);
      }

      updateMembersList(room);

      client.broadcast.to(room.name).emit(`message:userlist-change`, onUserLeftFormattedMessage);
    });

    clientManager.deleteClient(client.id);
    updateGlobalUsersList();

    console.log(`${client.id} has disconnected...`); // eslint-disable-line
  }

  return {
    handleRegister,
    handleGetUsers,
    handleInviteEmit,
    handlePostMessage,
    handleDisconnect,
    handleInvitationAccept,
    handleFetchRoom,
    handleLeaveRoom
  }
}

module.exports = makeHandlers;
