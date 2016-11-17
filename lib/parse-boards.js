'use strict'

const cheerio = require('cheerio')

module.exports = (page) => {
  var $ = cheerio.load(page)
  var list = []
  var boards = $('h2>a')
  var item

  boards.each(function (i, elem) {
    item = {}
    item.name = elem.children[0].data.trim()
    item.id = elem.attribs.href.split('/').pop()
    list.push(item)
  })

  return list
}
