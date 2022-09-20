const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const cors = require('cors');


const TodoService = require('./services/todoService');
const todoService = new TodoService('./data/todos.json');
const UserService = require('./services/userService');
const userService = new UserService('./data/users.json');

const app = express();

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const routes = require('./routes');

const port = 3000;

app.use(cors({ origin: "http://localhost:4200" }));

app.use('/', routes({
    todoService,
    userService,
}));

app.listen(port, () => {
    console.log(`Express server listening on port ${port}`);
})
