'use strict'

const tap = require('tap')
const getBoards = require('../lib/get-boards')

tap.test('It requires an options object', test => {
  const options = false
  const expectedErrorMessage = 'Missing required input: options object'
  getBoards(options, (error, data) => {
    tap.equal(error.message, expectedErrorMessage, expectedErrorMessage)
    test.done()
  })
})

tap.test('It requires options.host', test => {
  const options = {
    host: false
  }
  const expectedErrorMessage = 'Missing required input: options.host'
  getBoards(options, (error, data) => {
    tap.equal(error.message, expectedErrorMessage, expectedErrorMessage)
    test.done()
  })
})

tap.test('It requires options.host to be a valid url', test => {
  const options = {
    host: 'pysjepreik'
  }
  const expectedErrorMessage = 'Input error: options.host is not a valid url'
  getBoards(options, (error, data) => {
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
  getBoards(options, (error, data) => {
    tap.equal(error.message, expectedErrorMessage, expectedErrorMessage)
    test.done()
  })
})

tap.test('It returns expected results', test => {
  const options = {
    host: 'http://opengov.cloudapp.net',
    path: '/Meetings/tfk'
  }
  const expectedResult = require('./data/get-boards-data.json')
  getBoards(options, (error, data) => {
    if (error) {
      throw error
    } else {
      tap.equal(JSON.stringify(expectedResult), JSON.stringify(data), 'Returned boards OK')
    }

    test.done()
  })
})

tap.test('It returns error on error', test => {
  const options = {
    host: 'http://detteerenurlsomsannsynligviseikkefinnes.no',
    path: '/Meetings/tfk'
  }
  getBoards(options, (error, data) => {
    tap.ok(error, 'Error returned for boards')
    test.done()
  })
})
