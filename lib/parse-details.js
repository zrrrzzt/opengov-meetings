const $ = require('cheerio')

module.exports = page => {
  const list = []
  const files = $('div.filesList>ul>li', page)

  files.each((index, elem) => {
    const item = {
      title: elem.attribs.title.trim(),
      documentUrl: $('a', elem)['0'].attribs.href.trim(),
      documentSize: $('div.fileType>span.size', elem).text().trim(),
      documentCategory: $('div.fileDocumentCategory', elem).text().trim()
    }
    list.push(item)
  })

  return list
}
