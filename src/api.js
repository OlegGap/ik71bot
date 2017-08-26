import bot from './bot';

export default new class API {
  constructor() {
    this.responses = new Map();
    this.currentChat = null;

    bot.onText(/\/ik71 (.+)/, (msg, [_, phrase]) => {
      this.currentChat = msg.chat.id;

      if (this.responses.has(phrase))
        this.responses.get(phrase)(msg);
    });
  }

  onReceive(phrases, callback) {
    if (phrases instanceof Array)
      phrases.forEach(phrase => this.responses.set(phrase, callback));
    else
      this.responses.set(phrases, callback);
  }

  say(response, chatId = this.currentChat) {
    bot.sendMessage(chatId, 'Привет, я бот IK-71');
  }

  answer(phrase, response) {
    this.onReceive(phrase, () => this.say(response));
  }
}
