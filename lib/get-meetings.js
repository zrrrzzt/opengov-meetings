const validUrl = require('valid-url')
const getPage = require('./get-page')
const parseMeetings = require('./parse-meetings')

module.exports = options => {
  return new Promise(async (resolve, reject) => {
    const endpoint = '/Boards/Details/'

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

    if (!options.year) {
      return reject(new Error('Missing required input: options.year'))
    }

    const url = `${options.host}${options.path}${endpoint}${options.boardId}?Year=${options.year}`

    try {
      const body = await getPage(url)
      let data = parseMeetings(body)
      if (data && data.meetings) {
        data.meetings.forEach(item => {
          item.year = options.year
          item.yearMonthDay = parseInt(`${item.year}${item.month}${item.day}`, 10)
        })
      }
      return resolve(data)
    } catch (error) {
      return reject(error)
    }
  })
}
