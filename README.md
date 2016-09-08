[![Build Status](https://travis-ci.org/zrrrzzt/opengov-meetings.svg?branch=master)](https://travis-ci.org/zrrrzzt/opengov-meetings)
[![Coverage Status](https://coveralls.io/repos/zrrrzzt/opengov-meetings/badge.svg?branch=master&service=github)](https://coveralls.io/github/zrrrzzt/opengov-meetings?branch=master)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
# opengov-meetings

A Node.js module for connecting to the [360 OpenGov Meetings](http://www.software-innovation.com/no/produkter/360offentlig/digitalforvaltning/pages/Politiskagenda.aspx) solution from [Software Innovation](http://www.software-innovation.com/).

This API is based on screenscraping and far from rock solid.

It is however the best solution I've found so far to integrate 360 OpenGov Meetings with other systems.

## Installation

```sh
$ npm install opengov-meetings
```

## API

Every call requires an opts object with host and path set.

**host** this is usually "http://opengov.cloudapp.net"

**path** the path to your installation of OpenGov Meetings. Like "/Meetings/<your-organization>"

Every call returns error or a data object

### getBoards

List all boards.

```JavaScript
'use strict'

const ogm = require('opengov-meetings')
const opts = {
  host: 'http://opengov.cloudapp.net',
  path: '/Meetings/tfk'
}

function cb (err, data) {
  if (err) {
    console.error(err)
  } else {
    console.log(data)
  }
}

ogm.getBoards(opts, cb)
```

### getMeetings

List all meetings for a given board

**boardId** id for the board

```JavaScript
'use strict'

const ogm = require('opengov-meetings')
const opts = {
  host: 'http://opengov.cloudapp.net',
  path: '/Meetings/tfk',
  boardId: '200151',
  year: 2015
}

function cb (err, data) {
  if (err) {
    console.error(err)
  } else {
    console.log(data)
  }
}

ogm.getMeetings(opts, cb)
```

### getAgenda

List agenda for a given meeting.

**meetingId** id for the meeting

```JavaScript
'use strict'

const ogm = require('opengov-meetings')
const opts = {
  host: 'http://opengov.cloudapp.net',
  path: '/Meetings/tfk',
  meetingId: '203235'
}

function cb (err, data) {
  if (err) {
    console.error(err)
  } else {
    console.log(data)
  }
}

ogm.getAgenda(opts, cb)
```

### getDetails

Get details and documents for a given agendaItem

**agendaId** id for the item

```JavaScript
'use strict'

const ogm = require('opengov-meetings')
const opts = {
  host: 'http://opengov.cloudapp.net',
  path: '/Meetings/tfk',
  agendaId: '200262'
}

function cb (err, data) {
  if (err) {
    console.error(err)
  } else {
    console.log(data)
  }
}

ogm.getDetails(opts, cb)
```