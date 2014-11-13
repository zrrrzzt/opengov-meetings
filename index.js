'use strict';

var getBoards = require('./lib/getBoards')
  , getMeetings = require('./lib/getMeetings')
  , getAgenda = require('./lib/getAgenda')
  , getDetails = require('./lib/getDetails')
  ;

module.exports.getBoards = getBoards;

module.exports.getMeetings = getMeetings;

module.exports.getAgenda = getAgenda;

module.exports.getDetails = getDetails;