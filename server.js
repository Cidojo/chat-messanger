const server = require(`http`).createServer();
const io = require(`socket.io`)(server);
const config = require(`./server-config.js`).default;

const port = process.env.PORT || config.port;

io.on(`connection`, function (client) {
  client.on(`register`, handleRegister)

  client.on(`join`, handleJoin)

  client.on(`leave`, handleLeave)

  client.on(`message`, handleMessage)

  client.on(`chatrooms`, handleGetChatrooms)

  client.on(`availableUsers`, handleGetAvailableUsers)

  client.on(`disconnect`, function () {
    console.log(`client disconnected`, client.id)
    handleDisconnect()
  })

  client.on(`error`, function (err) {
    console.log(`received error from client:`, client.id)
    console.log(err)
  })
})

server.listen(port, function (err) {
  if (err) throw err
  console.log(`listening on port ${port}`)
})
