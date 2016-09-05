'use strict'

const tap = require('tap')
const getMeetings = require('../lib/get-meetings')

tap.test('It requires an options object', test => {
  const options = false
  const expectedErrorMessage = 'Missing required input: options object'
  getMeetings(options, (error, data) => {
    tap.equal(error.message, expectedErrorMessage, expectedErrorMessage)
    test.done()
  })
})

tap.test('It requires options.host', test => {
  const options = {
    host: false
  }
  const expectedErrorMessage = 'Missing required input: options.host'
  getMeetings(options, (error, data) => {
    tap.equal(error.message, expectedErrorMessage, expectedErrorMessage)
    test.done()
  })
})

tap.test('It requires options.host to be a valid url', test => {
  const options = {
    host: 'pysjepreik'
  }
  const expectedErrorMessage = 'Input error: options.host is not a valid url'
  getMeetings(options, (error, data) => {
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
  getMeetings(options, (error, data) => {
    tap.equal(error.message, expectedErrorMessage, expectedErrorMessage)
    test.done()
  })
})

tap.test('It requires options.boardId', test => {
  const options = {
    host: 'http://opengov.cloudapp.net',
    path: '/Meetings/tfk',
    boardId: false
  }
  const expectedErrorMessage = 'Missing required input: options.boardId'
  getMeetings(options, (error, data) => {
    tap.equal(error.message, expectedErrorMessage, expectedErrorMessage)
    test.done()
  })
})

tap.test('It returns expected results', test => {
  const options = {
    host: 'http://opengov.cloudapp.net',
    path: '/Meetings/tfk',
    boardId: '200151'
  }
  const expectedResult = require('./data/get-meetings-data.json')
  getMeetings(options, (error, data) => {
    if (error) {
      throw error
    } else {
      tap.equal(JSON.stringify(expectedResult), JSON.stringify(data), 'Returned meetings OK')
    }

    test.done()
  })
})

tap.test('It returns error on error', test => {
  const options = {
    host: 'http://detteerenurlsomsannsynligviseikkefinnes.no',
    path: '/Meetings/tfk',
    boardId: '200151'
  }
  getMeetings(options, (error, data) => {
    tap.ok(error, 'Error returned for meetings')
    test.done()
  })
})
