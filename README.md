#opengov-meetings

Connect to 360 OpenGov Meetings

##Installation

```
$ npm install opengov-meetings
```

##API

Every call requires an opts object with host and path set.

**host** this is usually "http://opengov.cloudapp.net"

**path** the path to your installation of OpenGov Meetings. Like "/Meetings/<your-organization>"

Every call returns error or a data object

###getBoards

List all boards.

```
'use strict';

var ogm = require('opengov-meetings')
  , opts = {
      host: 'http://opengov.cloudapp.net',
      path: '/Meetings/tfk'
    }
  ;

function cb(err, data){
  if(err){
    console.error(err);
  } else {
    console.log(data);
  }
}

ogm.getBoards(opts, cb);
```

###getMeetings

List all meetings for a given board

**boardId** id for the board

```
'use strict';

var ogm = require('./index')
  , opts = {
      host: 'http://opengov.cloudapp.net',
      path: '/Meetings/tfk',
      boardId: '200151'
    }
  ;

function cb(err, data){
  if(err){
    console.error(err);
  } else {
    console.log(data);
  }
}

ogm.getMeetings(opts, cb);
```