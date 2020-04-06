const validUrl = require('valid-url')
const getPage = require('./get-page')
const parseMembers = require('./parse-members')

module.exports = options => {
  return new Promise(async (resolve, reject) => {
    const endpoint = '/Boards/Details/'
    const url = options.host + options.path + endpoint + options.boardId

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

    if (!options.boardId) {
      return reject(new Error('Missing required input: options.boardId'))
    }

    try {
      const body = await getPage(url)
      const data = parseMembers(body)
      return resolve(Object.assign({}, { boardId: options.boardId }, data))
    } catch (error) {
      return reject(error)
    }
  })
}
