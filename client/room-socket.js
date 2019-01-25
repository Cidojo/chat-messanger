import io from 'socket.io-client';

export default (name) => {
  const roomSocket = io.of(name).on(`connection`, (roomSocket) => {
    roomSocket.on("set_name", (data) => {
      roomSocket.set('nickname', data.name, () => {
        roomSocket.emit('name_set', data);
        roomSocket.send(JSON.stringify({type:'serverMessage', message:'Welcome to the most interesting ' + 'chat room on earth!'}));
        roomSocket.broadcast.emit('user_entered', data);
      });
    });

    roomSocket.on('message', (message) => {
      message = JSON.parse(message);
      if (message.type == "userMessage") {
        roomSocket.get('nickname', (err, nickname) => {
          message.username = nickname;
          roomSocket.broadcast.send(JSON.stringify(message));
          message.type = "myMessage";
          roomSocket.send(JSON.stringify(message));
        });
      }
    });
  });

  const roomName = decodeURI((RegExp("room" + '=' + '(.+?)(&|$)').exec(location.search) || [, null])[1]);

  if (roomName) {
    chatInfra.on('name_set', function (data) {
      chatInfra.emit('join_room', {'name':roomName});
    });
  }


    const onMessageReceived = (cb) => {
      roomSocket.on(`message`, cb);
    }

    const onMessageSend = (message, name) => {
      roomSocket.emit(`message`, message);
    }

    const join = (name) => {
      roomSocket.emit(`join`, name);
    }
  //
  // const onMessageReceived = (message, username) => {
  //   roomSocket.emit(`message`, username);
  // }

  return {
    onMessageReceived,
    onMessageSend,
    join
  }
}
