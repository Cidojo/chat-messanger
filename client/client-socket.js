import io from 'socket.io-client';
import config from './config';

export default () => {
  const socket = io.connect(config.api);

  const registerQuery = (username) => {
    socket.emit(`registerQuery`, username);
  }

  const registerHandler = (cb) => {
    socket.on(`registered`, cb);
  }

  return {
    registerQuery,
    registerHandler
  }
}
