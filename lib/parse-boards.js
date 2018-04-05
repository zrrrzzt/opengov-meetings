const $ = require('cheerio')

module.exports = (page) => {
  let list = []
  const boards = $('li.boardLink', page)

  boards.each((index, elem) => {
    let item = {}
    item.name = $('div.boardName > h3', elem).text().trim()
    item.id = $('a', elem)[0].attribs.href.split('/').pop()
    list.push(item)
  })

  return list
}
