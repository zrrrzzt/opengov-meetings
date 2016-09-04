'use strict'

const validUrl = require('valid-url')
const getPage = require('./get-page')
const parseDetails = require('./parse-details')

module.exports = (opts, callback) => {
  var endpoint = '/AgendaItems/Details/'
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

  if (!opts.agendaId) {
    return callback(new Error('Missing required param: agendaId'), null)
  }

  url = opts.host + opts.path + endpoint + opts.agendaId

  getPage(url, function (error, body) {
    if (error) {
      return callback(error, null)
    } else {
      const list = parseDetails(body, opts.host)

      return callback(null, list)
    }
  })
}
