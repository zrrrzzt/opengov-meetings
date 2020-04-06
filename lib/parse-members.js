const $ = require('cheerio')

function parseName (data) {
  const nameList = data.split(' ')
  return {
    firstName: nameList.slice(0, nameList.length - 1).join(' '),
    lastName: nameList[nameList.length - 1]
  }
}

function parseInfo (data) {
  const list = data.split('-')
  return {
    party: list.length > 1 ? list[0].trim() : '',
    role: list.length > 1 ? list[1].trim() : list[0].trim()
  }
}

module.exports = page => {
  const list = []
  const header = $('.meetingTitleHeader', page)
  const members = $('.memberListItem', page)

  members.each((index, elem) => {
    const name = parseName($('div.memberName>h4', elem).text().trim())
    const info = parseInfo($('div.memberDesignation>p', elem).text().trim())
    const item = {
      firstName: name.firstName,
      lastName: name.lastName,
      party: info.party,
      role: info.role
    }
    list.push(item)
  })

  return {
    name: $(header[0]).text().trim(),
    members: list
  }
}
