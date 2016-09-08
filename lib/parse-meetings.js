'use strict'

const cheerio = require('cheerio')

function fixMonth (elem) {
  return elem > 11 ? elem - 12 : elem
}

module.exports = page => {
  var $ = cheerio.load(page)
  var data = {}
  var list = []
  var board = $('h1')[0].children[0].data.trim()
  var headers = $('table.calendar>thead>tr>th')
  var dates = $('.calendar td')
  var cell
  var item

  data.board = board

  Object.keys(dates).forEach(function (elem) {
    if (typeof parseInt(elem, 10) === 'number') {
      const month = fixMonth(elem)
      cell = dates[elem]
      if (cell.hasOwnProperty('type') && cell.children.length > 0) {
        item = {}
        if (cell.attribs.title) {
          item.date = cell.children[0].data + '. ' + headers[month].attribs.title
          item.day = cell.children[0].data
          item.month = parseInt(month, 10) + 1
          item.status = cell.attribs.title
          item.id = ''
        } else {
          item.date = cell.children[0].children[0].data + '. ' + headers[month].attribs.title
          item.day = cell.children[0].children[0].data
          item.month = parseInt(month, 10) + 1
          item.status = cell.children[0].attribs.title
          item.id = cell.children[0].attribs.href.split('/').pop()
        }
        list.push(item)
      }
    }
  })

  data.meetings = list

  return data
}
