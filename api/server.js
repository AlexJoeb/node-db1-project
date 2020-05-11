const express = require("express");

const db = require("../data/dbConfig.js");

const AccountsRoute = require('./Accounts');

const server = express();

server.use(express.json());

// * GET - All
server.use('/api/accounts', AccountsRoute);

module.exports = server;
