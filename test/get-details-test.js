'use strict'

const tap = require('tap')
const getDetails = require('../lib/get-details')

tap.test('It requires an options object', test => {
  const options = false
  const expectedErrorMessage = 'Missing required input: options object'
  getDetails(options, (error, data) => {
    tap.equal(error.message, expectedErrorMessage, expectedErrorMessage)
    test.done()
  })
})

tap.test('It requires options.host', test => {
  const options = {
    host: false
  }
  const expectedErrorMessage = 'Missing required input: options.host'
  getDetails(options, (error, data) => {
    tap.equal(error.message, expectedErrorMessage, expectedErrorMessage)
    test.done()
  })
})

tap.test('It requires options.host to be a valid url', test => {
  const options = {
    host: 'pysjepreik'
  }
  const expectedErrorMessage = 'Input error: options.host is not a valid url'
  getDetails(options, (error, data) => {
    tap.equal(error.message, expectedErrorMessage, expectedErrorMessage)
    test.done()
  })
})

tap.test('It requires options.path', test => {
  const options = {
    host: 'http://opengov.cloudapp.net',
    path: false
  }
  const expectedErrorMessage = 'Missing required input: options.path'
  getDetails(options, (error, data) => {
    tap.equal(error.message, expectedErrorMessage, expectedErrorMessage)
    test.done()
  })
})

tap.test('It requires options.agendaId', test => {
  const options = {
    host: 'http://opengov.cloudapp.net',
    path: '/Meetings/tfk',
    agendaId: false
  }
  const expectedErrorMessage = 'Missing required input: options.agendaId'
  getDetails(options, (error, data) => {
    tap.equal(error.message, expectedErrorMessage, expectedErrorMessage)
    test.done()
  })
})

tap.test('It returns expected results', test => {
  const options = {
    host: 'http://opengov.cloudapp.net',
    path: '/Meetings/tfk',
    agendaId: '200262'
  }
  const expectedResult = require('./data/get-details-data-full.json')
  getDetails(options, (error, data) => {
    if (error) {
      throw error
    } else {
      tap.equal(JSON.stringify(expectedResult), JSON.stringify(data), 'Returned details OK')
    }

    test.done()
  })
})

tap.test('It returns error on error', test => {
  const options = {
    host: 'http://detteerenurlsomsannsynligviseikkefinnes.no',
    path: '/Meetings/tfk',
    agendaId: '200262'
  }
  getDetails(options, (error, data) => {
    tap.ok(error, 'Error returned for details')
    test.done()
  })
})
