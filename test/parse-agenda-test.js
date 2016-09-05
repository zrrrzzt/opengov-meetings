'use strict'

const tap = require('tap')
const fs = require('fs')
const parseAgenda = require('../lib/parse-agenda')
const expectedResult = require('./data/get-agenda-data.json')
const data = fs.readFileSync('test/data/get-agenda-page.html', 'utf-8').toString()
const result = parseAgenda(data)

tap.equal(JSON.stringify(result), JSON.stringify(expectedResult), 'It parses agenda page as expected')
