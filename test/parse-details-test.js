const tap = require('tap')
const fs = require('fs')
const parseDetails = require('../lib/parse-details')
const expectedResult = require('./data/get-details-data.json')
const data = fs.readFileSync('test/data/get-details-page.html', 'utf-8').toString()
const result = parseDetails(data)

tap.equal(JSON.stringify(result), JSON.stringify(expectedResult), 'It parses details page as expected')
