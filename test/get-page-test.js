'use strict'

const tap = require('tap')
const getPage = require('../lib/get-page')

tap.test('It requires url', test => {
  const url = false
  const expectedErrorMessage = 'Missing required input: url'
  getPage(url, (error, data) => {
    tap.equal(error.message, expectedErrorMessage, expectedErrorMessage)
    test.done()
  })
})

tap.test('It requires url to be valid', test => {
  const url = 'pysjevev'
  const expectedErrorMessage = 'Input error: url is not valid'
  getPage(url, (error, data) => {
    tap.equal(error.message, expectedErrorMessage, expectedErrorMessage)
    test.done()
  })
})
