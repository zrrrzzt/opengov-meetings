const tap = require('tap')
const getDetails = require('../lib/get-details')
const host = 'http://opengov.cloudapp.net'

tap.test('It requires an options object', test => {
  const options = false
  const expectedErrorMessage = 'Missing required input: options object'
  return getDetails(options)
    .then(console.log)
    .catch(error => {
      tap.equal(error.message, expectedErrorMessage, expectedErrorMessage)
      test.done()
    })
})

tap.test('It requires options.host', test => {
  const options = {
    host: false
  }
  const expectedErrorMessage = 'Missing required input: options.host'
  return getDetails(options)
    .then(console.log)
    .catch(error => {
      tap.equal(error.message, expectedErrorMessage, expectedErrorMessage)
      test.done()
    })
})

tap.test('It requires options.host to be a valid url', test => {
  const options = {
    host: 'pysjepreik'
  }
  const expectedErrorMessage = 'Input error: options.host is not a valid url'
  return getDetails(options)
    .then(console.log)
    .catch(error => {
      tap.equal(error.message, expectedErrorMessage, expectedErrorMessage)
      test.done()
    })
})

tap.test('It requires options.path', test => {
  const options = {
    host: host,
    path: false
  }
  const expectedErrorMessage = 'Missing required input: options.path'
  return getDetails(options)
    .then(console.log)
    .catch(error => {
      tap.equal(error.message, expectedErrorMessage, expectedErrorMessage)
      test.done()
    })
})

tap.test('It requires options.agendaId', test => {
  const options = {
    host: host,
    path: '/Meetings/tfk',
    agendaId: false
  }
  const expectedErrorMessage = 'Missing required input: options.agendaId'
  return getDetails(options)
    .then(console.log)
    .catch(error => {
      tap.equal(error.message, expectedErrorMessage, expectedErrorMessage)
      test.done()
    })
})

tap.test('It returns expected results', test => {
  const options = {
    host: host,
    path: '/Meetings/tfk',
    agendaId: '211236'
  }
  const expectedResult = require('./data/get-details-data-full.json')
  return getDetails(options)
    .then(data => {
      tap.equal(JSON.stringify(expectedResult), JSON.stringify(data), 'Returned details OK')
      test.done()
    })
    .catch(error => {
      throw error
    })
})

tap.test('It returns error on error', test => {
  const options = {
    host: 'http://detteerenurlsomsannsynligviseikkefinnes.no',
    path: '/Meetings/tfk',
    agendaId: '211236'
  }
  return getDetails(options)
    .then(console.log)
    .catch(error => {
      tap.ok(error, 'Error returned for details')
      test.done()
    })
})
