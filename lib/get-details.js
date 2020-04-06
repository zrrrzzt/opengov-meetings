const validUrl = require('valid-url')
const getPage = require('./get-page')
const parseDetails = require('./parse-details')

module.exports = options => {
  return new Promise(async (resolve, reject) => {
    const endpoint = '/Meetings/LoadAgendaItemDetail/'
    const url = options.host + options.path + endpoint + options.agendaId

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

    if (!options.agendaId) {
      return reject(new Error('Missing required input: options.agendaId'))
    }

    try {
      const body = await getPage(url)
      const list = parseDetails(body)
      // Adds host url to documents
      list.forEach(item => {
        item.documentUrl = item.documentUrl !== '' ? options.host + item.documentUrl : ''
      })
      return resolve(list)
    } catch (error) {
      return reject(error)
    }
  })
}
