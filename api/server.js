const express = require('express');

const middleware = require('./middleware.js');
const router = require('./router.js');

const server = express();

middleware(server);

server.use('/api', router)

module.exports = server;