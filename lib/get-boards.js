const validUrl = require('valid-url')
const getPage = require('./get-page')
const parseBoards = require('./parse-boards')

module.exports = async options => {
  const endpoint = '/Boards'
  const url = options.host + options.path + endpoint

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

  const body = await getPage(url)
  const list = parseBoards(body)
  return list
}
