'use strict'

var request = require('request')
var cheerio = require('cheerio')
var validUrl = require('valid-url')

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

  request(url, function (err, response, body) {
    if (err) {
      return callback(err, null)
    } else {
      var $ = cheerio.load(body.toString())
      var list = []
      var files = $('table.agendaDetails>tbody>tr')
      var item

      files.each(function (i, elem) {
        if (i > 0) {
          item = {}
          item.title = elem.children[3].children[0].children[0].data
          item.documentUrl = opts.host + elem.children[3].children[0].attribs.href
          item.documentSize = elem.children[5].children[0].data
          item.documentCategory = elem.children[7].children[0].data
          list.push(item)
        }
      })

      return callback(null, list)
    }
  })
}
