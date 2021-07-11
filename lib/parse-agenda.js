const cheerio = require('cheerio')

module.exports = page => {
  const data = {}
  const details = {}
  const agendaList = []
  const documentList = []

  const $ = cheerio.load(page)
  const agendaDetails = $('.detailContent > p', page)

  details.board = $(agendaDetails[0]).text().trim()
  details.place = $(agendaDetails[1]).text().trim()
  details.date = $(agendaDetails[2]).text().trim()
  details.status = $(agendaDetails[3]).text().trim()

  data.details = details

  const documents = $('div.filesList>ul>li', page)

  documents.each((index, elem) => {
    const item = {}
    item.fileUrl = $('a', elem)[0].attribs.href
    item.title = elem.attribs.title.trim()
    documentList.push(item)
  })

  data.documents = documentList

  const agenda = $('div.meetingAgendaList>ul>li', page)

  agenda.each((index, elem) => {
    const agendaTitle = $('div.accordionTitle>h5', elem).text().trim()
    if (agendaTitle) {
      const item = {}
      const agendaNumber = agendaTitle.split(' - ')[0]
      item.agendanumber = agendaNumber
      item.title = agendaTitle.replace(`${agendaNumber} - `, '')
      if ($('a', elem)[0].attribs.id !== undefined) {
        item.id = $('a', elem)[0].attribs.id.split('_').pop()
        item.public = true
      } else {
        item.id = agendaNumber.replace('/', '-')
        item.public = false
      }
      agendaList.push(item)
    }
  })

  data.agenda = agendaList

  return data
}
