const validUrl = require('valid-url')
const getPage = require('./get-page')
const parseBoards = require('./parse-boards')

module.exports = options => {
  return new Promise(async (resolve, reject) => {
    const endpoint = '/Boards'
    const url = options.host + options.path + endpoint

    if (typeof options !== 'object') {
      return reject(new Error('Missing required input: options object'))
    }

    if (!options.host) {
      return reject(new Error('Missing required input: options.host'))
    }

    if (options.host && !validUrl.isWebUri(options.host)) {
      return reject(new Error('Input error: options.host is not a valid url'))
    }

    if (!options.path) {
      return reject(new Error('Missing required input: options.path'))
    }

    try {
      const body = await getPage(url)
      const list = parseBoards(body)
      return resolve(list)
    } catch (error) {
      return reject(error)
    }
  })
}
