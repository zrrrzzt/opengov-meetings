'use strict'

const validUrl = require('valid-url')
const getPage = require('./get-page')
const parseDetails = require('./parse-details')

module.exports = (opts, callback) => {
  var endpoint = '/AgendaItems/Details/'
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

  if (!opts.agendaId) {
    return callback(new Error('Missing required input: options.agendaId'), null)
  }

  url = opts.host + opts.path + endpoint + opts.agendaId

  getPage(url, function (error, body) {
    if (error) {
      return callback(error, null)
    } else {
      var list = parseDetails(body)

      // Adds host url to documents
      list.forEach(item => {
        item.documentUrl = opts.host + item.documentUrl
      })

      return callback(null, list)
    }
  })
}
