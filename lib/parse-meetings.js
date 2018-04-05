const $ = require('cheerio')

module.exports = page => {
  let data = {}
  let list = []
  const board = $('div.meetingTitleHeader>h2', page).text().trim()

  data.board = board

  const dates = $('div.meetingList>ul>li', page)

  dates.each((index, elem) => {
    let item = {}
    const date = $('div.meetingDate span', elem)['0'].children[0].data
    const status = $('div.meetingDate span', elem)['1'].children[0].data
    const link = $('a', elem)

    item.date = date
    item.day = date.split('.')[0]
    item.month = date.split('.')[1]
    item.year = date.split('.')[2]
    item.yearMonthDay = `${date.split('.')[2]}${date.split('.')[1]}${date.split('.')[0]}`
    item.status = status !== 'Ikke publisert' ? 'Publisert' : status
    item.id = link['0'] ? link['0'].attribs.href.split('/').pop() : ''

    list.push(item)
  })
  data.meetings = list

  return data
}
