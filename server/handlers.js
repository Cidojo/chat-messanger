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

  const onMembersListChange = (member, room) => {
    const event = room.members.has(member.id) ? `join` : `left`;
    const formattedMessage = getFormattedMessage(`User ${member.name} has ${event} the room...`, MessageType.SYSTEM);

    client.broadcast.to(room.name).emit(`room:update-members`, room.getMembersList(), formattedMessage);
  }

  const changeGlobalUsersList = () => {
    client.broadcast.emit(`global:update-users`, clientManager.getRegisteredClientsList());
  }


  const handleRegister = (name, roomName, cb) => {
    try {
      clientManager.registerClient(client.id, name);
    } catch (e) {
      cb(false);
    }

    const user = clientManager.getClientById(client.id);
    const room = roomName ? roomManager.add(roomName) : roomManager.getDefault();

    room.addMember(user);
    clientManager.addRoomToClient(user.id, room);

    cb(true, room.getProps(), clientManager.getRegisteredClientsList());

    onMembersListChange(user, room);
    changeGlobalUsersList();
  }


  const handlePostMessage = (roomName, text) => {
    const room = roomManager.getByName(roomName);
    const formattedMessage = getFormattedMessage(text, MessageType.USER);

    formattedMessage.from = clientManager.getClientById(client.id).name;

    room.addEntry(formattedMessage);

    io.to(roomName).emit(`message:get`, roomName, formattedMessage);
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
    const room = roomManager.getByName(host);

    room.addMember(user);
    clientManager.addRoomToClient(user.id, room);

    cb(room.getProps());

    onMembersListChange(user, room);
  }


  const handleLeaveRoom = (roomName) => {
    const user = clientManager.getClientById(client.id);
    const room = roomManager.getByName(roomName);

    clientManager.deleteRoomFromClient(client.id, room);

    room.deleteMember(user.id);

    onMembersListChange(user, room);
  }


  const handleFetchRoom = (roomName, cb) => {
    const room = roomManager.add(roomName).getProps();
    cb(room);
  }


  const handleDisconnect = () => {
    const user = clientManager.getClientById(client.id);

    user.rooms.forEach((room) => {
      room.deleteMember(client.id);

      if (!room.members.size && room.name !== roomManager.getDefault().name) {
        roomManager.delete(room.name);
      } else {
        onMembersListChange(user, room);
      }
    });

    clientManager.deleteClient(client.id);

    changeGlobalUsersList();
    console.log(`${client.id} has disconnected...`); // eslint-disable-line
  }


  return {
    handleRegister,
    handleInviteEmit,
    handlePostMessage,
    handleDisconnect,
    handleInvitationAccept,
    handleLeaveRoom,
    handleFetchRoom
  }
}

module.exports = makeHandlers;
