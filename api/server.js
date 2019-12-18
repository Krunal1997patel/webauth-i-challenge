const express = require('express');
const session = require('express-session');
const knexSessionConnect = require('connect-session-knex')(session)

const middleware = require('./middleware.js');
const router = require('./router.js');
const databass = require('../data/dbConfig.js');

const server = express();

const sessionCofiguration  = {
    name: 'cookiemonster',
    secret: 'this is secret',
    saveUninitialized: true,
    resave: false,

    cookie: {
        maxAge:  1000 * 60 * 18,
        secure: false,
        httpOnly: true,
    },

    store: new knexSessionConnect({
        kenx: databass,
        tablename: 'sessions',
        sidfieldname: 'sid',
        createtable: true,
        clearInterval: 1000 * 60 * 18,
    })
}



middleware(server);

server.use(session(sessionCofiguration))
server.use('/api', router)

module.exports = server;