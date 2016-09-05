'use strict'

const tap = require('tap')
const fs = require('fs')
const parseBoards = require('../lib/parse-boards')
const expectedResult = require('./data/get-boards-data.json')
const data = fs.readFileSync('data/get-boards-page.html', 'utf-8').toString()
const result = parseBoards(data)

tap.equal(JSON.stringify(result), JSON.stringify(expectedResult), 'It parses boards page as expected')
