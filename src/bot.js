import TelegramBot from 'node-telegram-bot-api';
import {createServer} from 'http';

// For `now` READY state.
createServer(() => {}).listen(8000);

export default new TelegramBot(
  '380505475:AAETWLxSBXPxdg_lmMi2xzRL4jCg9t51Pec',
  {polling: true}
);
