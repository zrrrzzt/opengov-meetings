const validUrl = require('valid-url')

module.exports = url => {
  return new Promise((resolve, reject) => {
    if (!url) {
      return reject(new Error('Missing required input: url'))
    }

    if (!validUrl.isWebUri(url)) {
      return reject(new Error('Input error: url is not valid'))
    }

    const protocol = /https/.test(url) ? 'https' : 'http'
    const http = require(protocol)
    let body = ''

    http.get(url, res => {
      res.on('data', chunk => {
        body += chunk.toString()
      })

      res.on('end', () => resolve(body))
    }).on('error', error => reject(error))
  })
}
