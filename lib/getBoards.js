'use strict'

var request = require('request')
var cheerio = require('cheerio')
var validUrl = require('valid-url')

module.exports = (opts, callback) => {
  var endpoint = '/Boards'
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

  url = opts.host + opts.path + endpoint

  request(url, function (err, response, body) {
    if (err) {
      return callback(err, null)
    } else {
      var $ = cheerio.load(body.toString())
      var list = []
      var boards = $('h2>a')
      var item

      boards.each(function (i, elem) {
        item = {}
        item.name = elem.children[0].data
        item.id = elem.attribs.href.split('/').pop()
        list.push(item)
      })

      return callback(null, list)
    }
  })
}
