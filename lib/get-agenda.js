const validUrl = require('valid-url')
const getPage = require('./get-page')
const parseAgenda = require('./parse-agenda')

module.exports = options => {
  return new Promise(async (resolve, reject) => {
    const endpoint = '/Meetings/Details/'
    let url

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

    if (!options.meetingId) {
      return reject(new Error('Missing required input: options.meetingId'))
    }

    url = options.host + options.path + endpoint + options.meetingId

    try {
      const body = await getPage(url)
      let data = parseAgenda(body)
      // Add complete url to files
      data.documents.forEach(item => {
        item.fileUrl = options.host + item.fileUrl
      })
      return resolve(data)
    } catch (error) {
      return reject(error)
    }
  })
}
