'use strict'

const validUrl = require('valid-url')
const getPage = require('./get-page')
const parseAgenda = require('./parse-agenda')

module.exports = (opts, callback) => {
  var endpoint = '/Meetings/Details/'
  var url

  if (typeof opts === 'function') {
    callback = opts
  }

  if (typeof opts !== 'object') {
    return callback(new Error('Missing required opts object'), null)
  }

  if (!opts.host) {
    return callback(new Error('Missing required param: host'), null)
  }

  if (opts.host && !validUrl.isWebUri(opts.host)) {
    return callback(new Error('host is not a valid url'), null)
  }

  if (!opts.path) {
    return callback(new Error('Missing required param: path'), null)
  }

  if (!opts.meetingId) {
    return callback(new Error('Missing required param: meetingId'), null)
  }

  url = opts.host + opts.path + endpoint + opts.meetingId

  getPage(url, (error, body) => {
    if (error) {
      return callback(error, null)
    } else {
      const data = parseAgenda(body, opts.host)
      return callback(null, data)
    }
  })
}
