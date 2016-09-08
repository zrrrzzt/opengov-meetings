'use strict'

const tap = require('tap')
const datePadding = require('../lib/date-padding')

tap.equal('01', datePadding(1), 'It pads single digit')

tap.equal('10', datePadding(10), 'It does not pad double digit')
