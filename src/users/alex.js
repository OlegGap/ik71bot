import api from '../api';

const default_message = `
Привет, я бот IK-71. Создан специально для этого чата.
Проект: https://github.com/sasha240100/ik71bot
`;

// Hello world!
api.command('ik71').answer(
  [
    'welcome',
    'hello',
    'hi',
    'hey'
  ],
  default_message
);

// Say hello!
api.answer(
  [
    /[Пп]ривет(.*)/,
    /[Дд]обрый (день|вечер)(.*)/,
    /[Дд]оброе утро(.*)/,
  ],
  'Привет!'
);

// Say good night!
api.answer(
  [
    /[Сс]покойной ночи(.*)/,
    /([Нн]ежных|[Сс]ладких|[Хх]ороших) снов(.*)/
  ],
  'Сладких снов!'
);
