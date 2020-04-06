const validUrl = require('valid-url')
const getPage = require('./get-page')
const parseDetails = require('./parse-details')

module.exports = async options => {
  const endpoint = '/Meetings/LoadAgendaItemDetail/'
  const url = options.host + options.path + endpoint + options.agendaId

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

  if (!options.agendaId) {
    throw new Error('Missing required input: options.agendaId')
  }

  const body = await getPage(url)
  const list = parseDetails(body)
  // Adds host url to documents
  list.forEach(item => {
    item.documentUrl = item.documentUrl !== '' ? options.host + item.documentUrl : ''
  })
  return list
}
