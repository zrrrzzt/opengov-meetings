const $ = require('cheerio')

module.exports = page => {
  let data = {}
  let details = {}
  let agendaList = []
  let documentList = []

  const agendaDetails = $('.detailContent > p', page)
  details.board = $(agendaDetails[0]).text().trim()
  details.place = $(agendaDetails[1]).text().trim()
  details.date = $(agendaDetails[2]).text().trim()
  details.status = $(agendaDetails[3]).text().trim()

  data.details = details

  const documents = $('div.filesList>ul>li', page)

  documents.each((index, elem) => {
    let item = {}
    item.fileUrl = $('a', elem)[0].attribs.href
    item.title = elem.attribs.title.trim()
    documentList.push(item)
  })

  data.documents = documentList

  const agenda = $('div.meetingAgendaList>ul>li', page)

  agenda.each((index, elem) => {
    const agendaTitle = $('div.accordionTitle>h4', elem).text().trim()
    if (agendaTitle) {
      let item = {}
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
