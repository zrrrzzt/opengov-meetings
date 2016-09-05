'use strict'

const validUrl = require('valid-url')
const getPage = require('./get-page')
const parseMeetings = require('./parse-meetings')

module.exports = (opts, callback) => {
  var endpoint = '/Boards/Details/'
  var url

  if (typeof opts !== 'object') {
    return callback(new Error('Missing required input: options object'), null)
  }

  if (!opts.host) {
    return callback(new Error('Missing required input: options.host'), null)
  }

  if (opts.host && !validUrl.isWebUri(opts.host)) {
    return callback(new Error('Input error: options.host is not a valid url'), null)
  }

  if (!opts.path) {
    return callback(new Error('Missing required input: options.path'), null)
  }

  if (!opts.boardId) {
    return callback(new Error('Missing required input: options.boardId'), null)
  }

  url = opts.host + opts.path + endpoint + opts.boardId

  getPage(url, function (error, body) {
    if (error) {
      return callback(error, null)
    } else {
      const data = parseMeetings(body)

      return callback(null, data)
    }
  })
}
