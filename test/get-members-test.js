const tap = require('tap')
const getMembers = require('../lib/get-members')
const host = 'http://opengov.cloudapp.net'

tap.test('It requires an options object', test => {
  const options = false
  const expectedErrorMessage = 'Missing required input: options object'
  return getMembers(options)
    .then(console.log)
    .catch(error => {
      tap.equal(error.message, expectedErrorMessage, expectedErrorMessage)
      test.end()
    })
})

tap.test('It requires options.host', test => {
  const options = {
    host: false
  }
  const expectedErrorMessage = 'Missing required input: options.host'
  return getMembers(options)
    .then(console.log)
    .catch(error => {
      tap.equal(error.message, expectedErrorMessage, expectedErrorMessage)
      test.end()
    })
})

tap.test('It requires options.host to be a valid url', test => {
  const options = {
    host: 'pysjepreik'
  }
  const expectedErrorMessage = 'Input error: options.host is not a valid url'
  return getMembers(options)
    .then(console.log)
    .catch(error => {
      tap.equal(error.message, expectedErrorMessage, expectedErrorMessage)
      test.end()
    })
})

tap.test('It requires options.path', test => {
  const options = {
    host: host,
    path: false
  }
  const expectedErrorMessage = 'Missing required input: options.path'
  return getMembers(options)
    .then(console.log)
    .catch(error => {
      tap.equal(error.message, expectedErrorMessage, expectedErrorMessage)
      test.end()
    })
})

tap.test('It requires options.boardId', test => {
  const options = {
    host: host,
    path: '/Meetings/tfk',
    boardId: false
  }
  const expectedErrorMessage = 'Missing required input: options.boardId'
  return getMembers(options)
    .then(console.log)
    .catch(error => {
      tap.equal(error.message, expectedErrorMessage, expectedErrorMessage)
      test.end()
    })
})

tap.test('It returns expected results', test => {
  const options = {
    host: host,
    path: '/Meetings/tfk',
    boardId: '217642'
  }
  const expectedResult = require('./data/get-members-data-full.json')
  return getMembers(options)
    .then(data => {
      tap.equal(JSON.stringify(expectedResult), JSON.stringify(data), 'Returned members OK')
      test.end()
    })
    .catch(error => {
      throw error
    })
})

tap.test('It returns error on error', test => {
  const options = {
    host: 'http://detteerenurlsomsannsynligviseikkefinnes.no',
    path: '/Meetings/tfk',
    boardId: '217642'
  }
  return getMembers(options)
    .then(console.log)
    .catch(error => {
      tap.ok(error, 'Error returned for details')
      test.end()
    })
})
