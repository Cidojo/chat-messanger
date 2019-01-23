class ClientManager {
  constructor() {
    this.clients = new Map();
  }

  addClient(client) {
    this.clients.set(client.id, {client})
  }

  registerClient(client, user) {
    this.clients.set(client.id, {client, user})
  }

  removeClient(client) {
    this.clients.delete(client.id)
  }

}

module.exports.default = ClientManager;

// const userTemplates = require('../config/users')

// module.exports = function () {
  // mapping of all connected clients
//   const clients = new Map()
//

//

//

//
//   function getAvailableUsers() {
//     const usersTaken = new Set(
//       Array.from(clients.values())
//         .filter(c => c.user)
//         .map(c => c.user.name)
//     )
//     return userTemplates
//       .filter(u => !usersTaken.has(u.name))
//   }
//
//   function isUserAvailable(userName) {
//     return getAvailableUsers().some(u => u.name === userName)
//   }
//
//   function getUserByName(userName) {
//     return userTemplates.find(u => u.name === userName)
//   }
//
//   function getUserByClientId(clientId) {
//     return (clients.get(clientId) || {}).user
//   }
//
//   return {
//     addClient,
//     registerClient,
//     removeClient,
//     getAvailableUsers,
//     isUserAvailable,
//     getUserByName,
//     getUserByClientId
//   }
// }
