'use strict'

const validUrl = require('valid-url')
const getPage = require('./get-page')
const parseMeetings = require('./parse-meetings')

module.exports = (opts, callback) => {
  const endpoint = '/Boards/Details/'

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

  if (!opts.year) {
    return callback(new Error('Missing required input: options.year'), null)
  }

  const url = `${opts.host}${opts.path}${endpoint}${opts.boardId}?Year=${opts.year}`

  getPage(url, function (error, body) {
    if (error) {
      return callback(error, null)
    } else {
      var data = parseMeetings(body)

      if (data && data.meetings) {
        data.meetings.forEach(item => {
          item.year = opts.year
          item.yearMonthDay = parseInt(`${item.year}${item.month}${item.day}`, 10)
        })
      }

      return callback(null, data)
    }
  })
}
