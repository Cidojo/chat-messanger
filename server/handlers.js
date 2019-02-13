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

  const handleRegister = (name, cb) => {
    try {
      clientManager.registerClient(client.id, name);
      if (roomManager.getRoomByName(name)) {
        throw new Error(`cant take name of active room name`);
      }
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
    client.broadcast.emit(`message:userlist-change`, newUserFormattedMessage);
    updateGlobalUsersList();
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
    const user = clientManager.getClientByName(invited);
    // const onUserJoinFormattedMessage = getFormattedMessage(`User ${user.name} has joined the room...`, MessageType.SYSTEM);

    const room = roomManager.getRoomByName(host);

    room.addMember(user);
    cb(room.getProps());
    updateMembersList(room);
    // user.client.broadcast.to(host).emit(`message:userlist-change`, onUserJoinFormattedMessage);
  }


  const handleDisconnect = () => {
    const user = clientManager.getClientById(client.id);
    const onUserLeftFormattedMessage = getFormattedMessage(`User ${user.name} has left the room...`, MessageType.SYSTEM);

    user.rooms.forEach((room) => {
      room.deleteMember(client.id);
      console.log(`After deletion: ${[...room.members.values()]}`);

      if (!room.members.size) {
        roomManager.deleteRoom(room.id);
        console.log(`All rooms ${roomManager.getRooms()}`)
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
    handleFetchRoom
  }
}

module.exports = makeHandlers;
