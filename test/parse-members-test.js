const tap = require('tap')
const { readFileSync } = require('fs')
const parseMembers = require('../lib/parse-members')
const expectedResult = require('./data/get-members-data.json')
const data = readFileSync('test/data/get-members-page.html', 'utf-8')
const result = parseMembers(data)

tap.equal(JSON.stringify(result), JSON.stringify(expectedResult), 'It parses members page as expected')
