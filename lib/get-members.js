const validUrl = require('valid-url')
const getPage = require('./get-page')
const parseMembers = require('./parse-members')

module.exports = async options => {
  const endpoint = '/Boards/Details/'
  const url = options.host + options.path + endpoint + options.boardId

  if (typeof options !== 'object') {
    throw new Error('Missing required input: options object')
  }

  if (!options.host) {
    throw new Error('Missing required input: options.host')
  }

  if (options.host && !validUrl.isWebUri(options.host)) {
    throw new Error('Input error: options.host is not a valid url')
  }

  if (!options.path) {
    throw new Error('Missing required input: options.path')
  }

  if (!options.boardId) {
    throw new Error('Missing required input: options.boardId')
  }

  const body = await getPage(url)
  const data = parseMembers(body)
  return Object.assign({}, { boardId: options.boardId }, data)
}
