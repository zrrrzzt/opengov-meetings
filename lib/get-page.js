'use strict'

const validUrl = require('valid-url')

module.exports = (url, callback) => {
  if (!url) {
    return callback(new Error('Missing required input: url'), null)
  }

  if (!validUrl.isWebUri(url)) {
    return callback(new Error('Input error: url is not valid'), null)
  }

  const protocol = /https/.test(url) ? 'https' : 'http'
  const http = require(protocol)
  var body = ''

  http.get(url, res => {
    res.on('data', chunk => {
      body += chunk.toString()
    })

    res.on('end', () => callback(null, body))
  }).on('error', error => callback(error, null))
}
