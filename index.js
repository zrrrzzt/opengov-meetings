'use strict'

var getBoards = require('./lib/getBoards')
var getDetails = require('./lib/getDetails')

module.exports.getBoards = getBoards

module.exports.getMeetings = require('./lib/get-meetings')

module.exports.getAgenda = require('./lib/get-agenda')

module.exports.getDetails = getDetails
