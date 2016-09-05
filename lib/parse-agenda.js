'use strict'

const cheerio = require('cheerio')

module.exports = (page) => {
  var $ = cheerio.load(page)
  var data = {}
  var details = {}
  var agendaList = []
  var documentList = []
  var agenda = $('tr.on')
  var about = $('#about>div')
  var documents = $('#documents>ul>li>a')
  var item
  var doc

  details.board = about[1].attribs.title
  details.place = about[3].children[0] ? about[3].children[0].data.trim() : ''
  details.date = about[5].children[0] ? about[5].children[0].data.trim() : ''
  details.status = about[7].children[0] ? about[7].children[0].data.trim() : ''

  data.details = details

  Object.keys(documents).forEach(function (elem) {
    if (typeof parseInt(elem, 10) === 'number') {
      doc = documents[elem]
      if (doc.hasOwnProperty('type')) {
        item = {}
        item.fileUrl = doc.attribs.href.trim()
        item.title = doc.children[0].data.trim()
        documentList.push(item)
      }
    }
  })

  data.documents = documentList

  agenda.each(function (i, elem) {
    item = {}
    item.agendanumber = elem.children[1].children[0].data.trim()
    item.title = elem.children[3].children[1].children[0].data.trim()
    item.id = elem.children[3].children[1].attribs.href ? elem.children[3].children[1].attribs.href.split('/').pop() : ''
    agendaList.push(item)
  })

  data.agenda = agendaList

  return data
}
