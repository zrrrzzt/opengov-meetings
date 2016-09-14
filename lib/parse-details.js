'use strict'

const cheerio = require('cheerio')

module.exports = page => {
  var $ = cheerio.load(page)
  var list = []
  var files = $('table.agendaDetails>tbody>tr')
  var item

  files.each(function (i, elem) {
    if (i > 0) {
      item = {}
      if (elem.children[3].children[0].children) {
        item.title = elem.children[3].children[0].children[0].data.trim()
        item.documentUrl = elem.children[3].children[0].attribs.href.trim()
      } else {
        item.title = elem.children[3].children[0].data.trim()
        item.documentUrl = ''
      }
      if (elem.children[5].children[0]) {
        item.documentSize = elem.children[5].children[0].data.trim()
      } else {
        item.documentSize = ''
      }
      item.documentCategory = elem.children[7].children[0].data.trim()
      list.push(item)
    }
  })

  return list
}
