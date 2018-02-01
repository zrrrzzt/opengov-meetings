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
const ogm = require('opengov-meetings')
const options = {
  host: 'http://opengov.cloudapp.net',
  path: '/Meetings/tfk'
}

ogm.getBoards(options)
.then(console.log)
.catch(console.error)
```

### getMeetings

List all meetings for a given board

**boardId** id for the board

```JavaScript
const ogm = require('opengov-meetings')
const options = {
  host: 'http://opengov.cloudapp.net',
  path: '/Meetings/tfk',
  boardId: '200151',
  year: 2015
}

ogm.getMeetings(options)
.then(console.log)
.catch(console.error)
```

### getAgenda

List agenda for a given meeting.

**meetingId** id for the meeting

```JavaScript
const ogm = require('opengov-meetings')
const options = {
  host: 'http://opengov.cloudapp.net',
  path: '/Meetings/tfk',
  meetingId: '203235'
}

ogm.getAgenda(options)
.then(console.log)
.catch(console.error)
```

### getDetails

Get details and documents for a given agendaItem

**agendaId** id for the item

```JavaScript
const ogm = require('opengov-meetings')
const options = {
  host: 'http://opengov.cloudapp.net',
  path: '/Meetings/tfk',
  agendaId: '200262'
}

ogm.getDetails(options)
.then(console.log)
.catch(console.error)
```

## License
[MIT](LICENSE)

![Robohash image of opengov-meetings](https://robots.kebabstudios.party/opengov-meetings.png "Robohash image of opengov-meetings")