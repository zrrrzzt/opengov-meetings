const validUrl = require('valid-url')
const getPage = require('./get-page')
const parseMeetings = require('./parse-meetings')

module.exports = async options => {
  const endpoint = '/Boards/Details/'
  const url = `${options.host}${options.path}${endpoint}${options.boardId}?Year=${options.year}`

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

  if (!options.year) {
    throw new Error('Missing required input: options.year')
  }

  const body = await getPage(url)
  const data = parseMeetings(body)
  if (data && data.meetings) {
    data.meetings.forEach(item => {
      item.year = options.year
      item.yearMonthDay = parseInt(`${item.year}${item.month}${item.day}`, 10)
    })
  }
  return data
}
