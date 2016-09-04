'use strict'

var request = require('request')
  , cheerio = require('cheerio')
  , validUrl = require('valid-url')

function getBoards (opts, callback) {
  var endpoint = '/Boards'
    , url

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
        , list = []
        , boards = $('h2>a')
        , item

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

module.exports = getBoards
