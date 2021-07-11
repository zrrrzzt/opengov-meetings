const cheerio = require('cheerio')

module.exports = (page) => {
  const list = []

  const $ = cheerio.load(page)
  const boards = $('li.boardLink', page)

  boards.each((index, elem) => {
    const item = {}
    item.name = $('div.boardName > span', elem).text().trim()
    item.id = $('a', elem)[0].attribs.href.split('/').pop()
    list.push(item)
  })

  return list
}
