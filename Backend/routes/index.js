const express = require('express');

const todosRoute = require('./todo');
const usersRoute = require('./users')

const router = express.Router();

module.exports = (params) =>{

router.use('/todos', todosRoute(params));
router.use('/users', usersRoute(params));
return router;

}