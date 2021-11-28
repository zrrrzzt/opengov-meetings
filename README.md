[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

# opengov-meetings

A Node.js module for connecting to the 360 OpenGov Meetings solution from [TietoEVRY](https://www.tietoevry.com/).

This API is based on screenscraping and far from rock solid. 

It is however the best solution I've found so far to integrate 360 OpenGov Meetings with other systems.

This module supports the newest version of OpenGov. For previous versions stick to `v4.1.1`.

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
const { getBoards } = require('opengov-meetings')
const options = {
  host: 'http://opengov.cloudapp.net',
  path: '/Meetings/tfk'
}

getBoards(options)
.then(console.log)
.catch(console.error)
```

### getMeetings

List all meetings for a given board

**boardId** id for the board

```JavaScript
const { getMeetings } = require('opengov-meetings')
const options = {
  host: 'http://opengov.cloudapp.net',
  path: '/Meetings/tfk',
  boardId: '200151',
  year: 2015
}

getMeetings(options)
.then(console.log)
.catch(console.error)
```

### getAgenda

List agenda for a given meeting.

**meetingId** id for the meeting

```JavaScript
const { getAgenda } = require('opengov-meetings')
const options = {
  host: 'http://opengov.cloudapp.net',
  path: '/Meetings/tfk',
  meetingId: '203235'
}

getAgenda(options)
.then(console.log)
.catch(console.error)
```

### getDetails

Get details and documents for a given agendaItem

**agendaId** id for the item

```JavaScript
const { getDetails } = require('opengov-meetings')
const options = {
  host: 'http://opengov.cloudapp.net',
  path: '/Meetings/tfk',
  agendaId: '200262'
}

getDetails(options)
.then(console.log)
.catch(console.error)
```

### getMembers

Get members for a given board

**boardId** id for the board

```JavaScript
const { getMembers } = require('opengov-meetings')
const options = {
  host: 'http://opengov.cloudapp.net',
  path: '/Meetings/tfk',
  agendaId: '217642'
}

getMembers(options)
.then(console.log)
.catch(console.error)
```

## License

[MIT](LICENSE)