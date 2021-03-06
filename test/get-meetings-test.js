const tap = require('tap')
const getMeetings = require('../lib/get-meetings')
const host = 'http://opengov.cloudapp.net'

tap.test('It requires an options object', test => {
  const options = false
  const expectedErrorMessage = 'Missing required input: options object'
  return getMeetings(options)
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
  return getMeetings(options)
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
  return getMeetings(options)
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
  return getMeetings(options)
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
  return getMeetings(options)
    .then(console.log)
    .catch(error => {
      tap.equal(error.message, expectedErrorMessage, expectedErrorMessage)
      test.end()
    })
})

tap.test('It requires options.year', test => {
  const options = {
    host: host,
    path: '/Meetings/tfk',
    boardId: '216162',
    year: false
  }
  const expectedErrorMessage = 'Missing required input: options.year'
  return getMeetings(options)
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
    boardId: '216162',
    year: '2018'
  }
  const expectedResult = require('./data/get-meetings-data-full.json')
  return getMeetings(options)
    .then(data => {
      tap.equal(JSON.stringify(expectedResult), JSON.stringify(data), 'Returned meetings OK')
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
    boardId: '216162',
    year: '2018'
  }
  return getMeetings(options)
    .then(console.log)
    .catch(error => {
      tap.ok(error, 'Error returned for meetings')
      test.end()
    })
})
