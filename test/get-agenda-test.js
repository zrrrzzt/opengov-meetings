const tap = require('tap')
const getAgenda = require('../lib/get-agenda')
const host = 'http://opengov.cloudapp.net'

tap.test('It requires an options object', test => {
  const options = false
  const expectedErrorMessage = 'Missing required input: options object'
  return getAgenda(options)
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
  return getAgenda(options)
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
  return getAgenda(options)
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
  return getAgenda(options)
    .then(console.log)
    .catch(error => {
      tap.equal(error.message, expectedErrorMessage, expectedErrorMessage)
      test.end()
    })
})

tap.test('It requires options.meetingId', test => {
  const options = {
    host: host,
    path: '/Meetings/tfk',
    meetingId: false
  }
  const expectedErrorMessage = 'Missing required input: options.meetingId'
  return getAgenda(options)
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
    meetingId: '644324'
  }
  const expectedResult = require('./data/get-agenda-data-full.json')
  return getAgenda(options)
    .then(data => {
      tap.equal(JSON.stringify(expectedResult), JSON.stringify(data), 'Returned agenda OK')
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
    meetingId: '644324'
  }
  return getAgenda(options)
    .then(console.log)
    .catch(error => {
      tap.ok(error, 'Error returned for agenda')
      test.end()
    })
})
