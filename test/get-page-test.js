const tap = require('tap')
const getPage = require('../lib/get-page')

tap.test('It requires url', test => {
  const url = false
  const expectedErrorMessage = 'Missing required input: url'
  return getPage(url)
    .then(console.log)
    .catch(error => {
      tap.equal(error.message, expectedErrorMessage, expectedErrorMessage)
      test.end()
    })
})

tap.test('It requires url to be valid', test => {
  const url = 'pysjevev'
  const expectedErrorMessage = 'Input error: url is not valid'
  return getPage(url)
    .then(console.log)
    .catch(error => {
      tap.equal(error.message, expectedErrorMessage, expectedErrorMessage)
      test.end()
    })
})

tap.test('It gets page from valid url', test => {
  const url = 'https://www.google.com'
  return getPage(url)
    .then(data => {
      tap.ok(data, 'Data exists')
      test.end()
    }).catch(error => {
      throw error
    })
})

tap.test('Returns error as expected', function (test) {
  const url = 'http://detteerenurlsomsannsynligviseikkefinnes.no'
  return getPage(url)
    .then(console.log)
    .catch(error => {
      tap.ok(error, 'Got error, indeed')
      test.end()
    })
})
