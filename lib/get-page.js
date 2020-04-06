const validUrl = require('valid-url')
const axios = require('axios')

module.exports = async url => {
  if (!url) {
    throw new Error('Missing required input: url')
  }

  if (!validUrl.isWebUri(url)) {
    throw new Error('Input error: url is not valid')
  }

  const { data } = await axios(url)
  return data
}
