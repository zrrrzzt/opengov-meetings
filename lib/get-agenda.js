const validUrl = require('valid-url')
const getPage = require('./get-page')
const parseAgenda = require('./parse-agenda')

module.exports = async options => {
  const endpoint = '/Meetings/Details/'
  const url = options.host + options.path + endpoint + options.meetingId

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

  if (!options.meetingId) {
    throw new Error('Missing required input: options.meetingId')
  }

  const body = await getPage(url)
  const data = parseAgenda(body)
  // Add complete url to files
  data.documents.forEach(item => {
    item.fileUrl = options.host + item.fileUrl
  })
  return data
}
