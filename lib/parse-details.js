'use strict'

const cheerio = require('cheerio')

module.exports = page => {
  var $ = cheerio.load(page)
  var list = []
  var files = $('table.agendaDetails>tbody>tr')
  var item

  files.each(function (i, elem) {
    item = {}
    if (elem.children[3].children[1].children) {
      item.title = elem.children[3].children[1].children[0].data.trim()
      item.documentUrl = elem.children[3].children[1].attribs.href.trim()
    } else {
      item.title = elem.children[3].children[0].data.trim()
      item.documentUrl = ''
    }
    if (elem.children[5].children[0]) {
      item.documentSize = elem.children[5].children[0].data.trim()
    } else {
      item.documentSize = ''
    }
    item.documentCategory = elem.children[3].children[5].children[0].data.trim().replace('Dokumentkategori: ', '')
    list.push(item)
  })

  return list
}
