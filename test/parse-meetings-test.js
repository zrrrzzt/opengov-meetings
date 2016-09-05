'use strict'

const tap = require('tap')
const fs = require('fs')
const parseMeetings = require('../lib/parse-meetings')
const expectedResult = require('./data/get-meetings-data.json')
const data = fs.readFileSync('test/data/get-meetings-page.html', 'utf-8').toString()
const result = parseMeetings(data)

tap.equal(JSON.stringify(result), JSON.stringify(expectedResult), 'It parses meetings page as expected')
