const validUrl = require('valid-url')
const axios = require('axios')

module.exports = url => {
  return new Promise(async (resolve, reject) => {
    if (!url) {
      return reject(new Error('Missing required input: url'))
    }

    if (!validUrl.isWebUri(url)) {
      return reject(new Error('Input error: url is not valid'))
    }

    try {
      const { data } = await axios(url)
      resolve(data)
    } catch (error) {
      reject(error)
    }
  })
}
