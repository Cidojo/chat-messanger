const moment = require('moment'),
      ClientManager = require('./client-manager'),
      RoomManager = require('./room-manager');

const clientManager = new ClientManager,
      roomManager = new RoomManager;

const socketHandler = (client) => {
  console.log(`${client.id} connected...`); // eslint-disable-line

  clientManager.add(client);

  client.on(`register`, (name, cb) => {
    try {
      clientManager.register(client.id, name);
    } catch (e) {
      cb(false);
    }

    const roomName = name;
    const roomID = client.id;

    roomManager.addRoom(roomID, roomName);
    client.join(roomName);
    roomManager.addMemberToRoom(clientManager.allUsers.get(client.id), roomID);
    cb(true);
  })

  client.on(`members:get`, (room, cb) => {
    cb(roomManager.getRoomMembersByName(room));
  });

  client.on(`users:get`, (cb) => {
    cb(clientManager.getGlobalUsersList());
  });

  client.on(`invite`, (to, room) => {
    clientManager.getUserByName(to).client.join(room, () => {
    });
  });

  client.on(`message:post`, (roomName, text) => {
    const room = roomManager.getRoomByName(roomName);
    const formattedMessage = {
      from: clientManager.getUserById(client.id).name,
      text,
      createdAt: `[${moment().format(`hh:mm:ss a`)}]`
    };

    room.addEntry(formattedMessage);
    room.broadcastMessage(formattedMessage);
  });

  client.on(`disconnect`, () => {
    clientManager.delete(client.id);

    console.log(`${client.id} has disconnected...`); // eslint-disable-line
  });

  client.on('error', function (err) {
    console.log('received error from client:', client.id); // eslint-disable-line
    console.log(err); // eslint-disable-line
  })
}

module.exports = socketHandler;
