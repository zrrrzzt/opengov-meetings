'use strict'

var request = require('request')
var cheerio = require('cheerio')
var validUrl = require('valid-url')

module.exports = (opts, callback) => {
  var endpoint = '/Boards/Details/'
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

  if (!opts.boardId) {
    return callback(new Error('Missing required param: boardId'), null)
  }

  url = opts.host + opts.path + endpoint + opts.boardId

  request(url, function (err, response, body) {
    if (err) {
      return callback(err, null)
    } else {
      var $ = cheerio.load(body.toString())
      var data = {}
      var list = []
      var board = $('h1')[0].children[0].data.trim()
      var headers = $('table.calendar>thead>tr>th')
      var dates = $('.calendar td')
      var cell
      var item

      data.board = board

      Object.keys(dates).forEach(function (elem) {
        if (typeof parseInt(elem, 10) === 'number') {
          cell = dates[elem]
          if (cell.hasOwnProperty('type') && cell.children.length > 0) {
            item = {}
            if (cell.attribs.title) {
              item.date = cell.children[0].data + '. ' + headers[elem].attribs.title
              item.status = cell.attribs.title
              item.id = ''
            } else {
              item.date = cell.children[0].children[0].data + '. ' + headers[elem].attribs.title
              item.status = cell.children[0].attribs.title
              item.id = cell.children[0].attribs.href.split('/').pop()
            }
            list.push(item)
          }
        }
      })

      data.meetings = list

      return callback(null, data)
    }
  })
}
