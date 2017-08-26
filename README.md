### Requirements

- [Node.js](https://nodejs.org/en/)
- NPM
- `npm i -g now babel-node` (install dev/deploy tools).

### Installation
1. `git clone https://github.com/sasha240100/ik71bot.git`
2. `cd ./ik71bot`
3. `npm install`

### Development and Deployment

`npm run dev` - Start development

`npm run deploy` - Deploy to a server

`npm run undeploy` - Stop and remove a bot from a server

### User API
1. Create a file `./src/users/yourName.js` with the following template code:

**`./src/users/yourName.js`**:
```js
import api from '../api';

// your code goes here
```

2. Add this file to `index.js` users list:

**`./src/index.js`**:
```js
import './bot';

// Users
import './users/alex';
import './users/yourName'; // Add this line
```

#### `api.answer(phrases: String[], response: String)`
Answers to `/ik71 anyTextMessage`, where "anyTextMessage" is your phrase (Can be a string or an array of strings)
- `phrases` - What bot receives as your message in chat
- `response` - What bot answers after receiving the message

#### `api.say(response: String)`
Simply tell a phrase in a chat.

#### `api.onReceive(phrases: String[], callback: Function)`
Execute some code when phrase is recieved.

