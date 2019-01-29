const moment = require('moment');
// const queryString = require('query-string');

const createMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: moment(new Date()).format(`h:mm:ss a`)
  }
}

module.exports = {
  createMessage
}
