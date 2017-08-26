import bot from './bot';

export default new class API {
  static responseExecuteAction(map, phrase, msg) {
    for (let [key, callback] of map.entries()) {
      if (key instanceof RegExp && key.test(phrase))
        callback(msg);
    }

    if (map.has(phrase))
      map.get(phrase)(msg);
  }

  static defaultResponseActionCallback(map, scope) {
    return function (msg, [_, phrase]) {
      scope.currentChat = msg.chat.id;
      API.responseExecuteAction(map, phrase, msg);
    }
  }

  constructor() {
    this.phraseKey = null;
    this.responses = new Map();
    this.keyResponses = new Map();
    this.currentChat = null;

    bot.on('message', ({text, chat: {id}}) => {
      this.currentChat = id;
      API.responseExecuteAction(this.responses, text, text);
    });
  }

  responseAction(phrase, callback) {
    if (this.phraseKey) {
      if (this.keyResponses.has(this.phraseKey)) {
        const responses = this.keyResponses.get(this.phraseKey);
        responses.set(phrase, callback);
      } else {
        const responses = new Map();
        responses.set(phrase, callback);

        bot.onText(
          new RegExp(`\\/${this.phraseKey} (.+)`),
          API.defaultResponseActionCallback(responses, this)
        );

        this.keyResponses.set(this.phraseKey, responses);
      }
    } else this.responses.set(phrase, callback);
  }

  command(phraseKey = null) {
    this.phraseKey = phraseKey;
    return this;
  }

  onReceive(phrases, callback, resetCommand = true) {
    if (phrases instanceof Array)
      phrases.forEach(phrase => this.responseAction(phrase, callback));
    else
      this.responses.set(phrases, callback);

    if (resetCommand) this.command(null);
  }

  say(response, chatId = this.currentChat) {
    bot.sendMessage(chatId, response);
  }

  answer(phrase, response) {
    this.onReceive(phrase, () => this.say(response));
  }
}
