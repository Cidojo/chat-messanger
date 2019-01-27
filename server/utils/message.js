const moment = require('moment');
const queryString = require('query-string');

const generateMessage = (name, text, type) => {
  const date = new Date();

  return {
    type,
    name,
    body: text,
    createdAt: moment(date).format(`h:mm:ss a`)
  }
}

module.exports = {
  generateMessage
}
