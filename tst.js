const { getMeetings } = require('./index')
const options = {
  host: 'http://opengov.cloudapp.net',
  path: '/Meetings/tfk',
  boardId: '216162',
  year: '2018'
}

getMeetings(options)
  .then(data => {
    console.log(JSON.stringify(data, null, 2))
  })
  .catch(console.error)
