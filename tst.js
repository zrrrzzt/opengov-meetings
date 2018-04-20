const { getAgenda } = require('./index')
const options = {
  host: 'http://opengov.cloudapp.net',
  path: '/Meetings/tfk',
  meetingId: '627172'
}

getAgenda(options)
  .then(data => {
    console.log(JSON.stringify(data, null, 2))
  })
  .catch(console.error)
