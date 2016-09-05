'use strict'

const tap = require('tap')
const getAgenda = require('../lib/get-agenda')

tap.test('It requires an options object', test => {
  const options = false
  const expectedErrorMessage = 'Missing required input: options object'
  getAgenda(options, (error, data) => {
    tap.equal(error.message, expectedErrorMessage, expectedErrorMessage)
    test.done()
  })
})

tap.test('It requires options.host', test => {
  const options = {
    host: false
  }
  const expectedErrorMessage = 'Missing required input: options.host'
  getAgenda(options, (error, data) => {
    tap.equal(error.message, expectedErrorMessage, expectedErrorMessage)
    test.done()
  })
})

tap.test('It requires options.host to be a valid url', test => {
  const options = {
    host: 'pysjepreik'
  }
  const expectedErrorMessage = 'Input error: options.host is not a valid url'
  getAgenda(options, (error, data) => {
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
  getAgenda(options, (error, data) => {
    tap.equal(error.message, expectedErrorMessage, expectedErrorMessage)
    test.done()
  })
})

tap.test('It requires options.meetingId', test => {
  const options = {
    host: 'http://opengov.cloudapp.net',
    path: '/Meetings/tfk',
    meetingId: false
  }
  const expectedErrorMessage = 'Missing required input: options.meetingId'
  getAgenda(options, (error, data) => {
    tap.equal(error.message, expectedErrorMessage, expectedErrorMessage)
    test.done()
  })
})

tap.test('It returns expected results', test => {
  const options = {
    host: 'http://opengov.cloudapp.net',
    path: '/Meetings/tfk',
    meetingId: '203235'
  }
  const expectedResult = require('./data/get-agenda-data-full.json')
  getAgenda(options, (error, data) => {
    if (error) {
      throw error
    } else {

    }
    tap.equal(JSON.stringify(expectedResult), JSON.stringify(data), 'Returned agenda OK')
    test.done()
  })
})
