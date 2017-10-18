require('dotenv').config()

const express = require('express')
const app = express()
const dal = require('./dal.js')
const port = process.env.PORT || 4000
const HTTPError = require('node-http-error')
const bodyParser = require('body-parser')
const { prop, path } = require('ramda')

const checkRequiredFields = require('./lib/check-required-fields')

app.use(bodyParser.json())

app.get('/', function(req, res, next) {
  res.send('Welcome to the Soccer Players API!')
})

/////////////////////////
///   PLAYERS
////////////////////////

// CREATE - POST /players
app.post('/players', function(req, res, next) {
  const arrFieldsFailedValidation = checkRequiredFields(
    [
      'name',
      'nationality',
      'yearBorn',
      'goals',
      'titles',
      'position',
      'club',
      'type'
    ],
    prop('body', req)
  )
  if (arrFieldsFailedValidation.length > 0) {
    return next(
      new HTTPError(400, 'Missing Required Fields', {
        fields: arrFieldsFailedValidation
      })
    )
  }
  if (path(['body', 'type'], req) !== 'player') {
    return next(
      new HTTPError(400, "'type' field value must be equyal to 'player'")
    )
  }
  dal
    .addPlayer(prop('body', req))
    .then(addedPlayer => res.status(201).send(addedPlayer))
    .catch(err => next(new HTTPError(err.status, err.message, err)))
})
// READ - GET /players/:id
app.get('/players/:id', function(req, res, next) {
  dal
    .getPlayer(path(['params', 'id'], req))
    .then(player => res.status(200).send(player))
    .catch(err => next(new HTTPError(err.status, err.message, err)))
})

app.use(function(err, req, res, next) {
  console.log(req.method, ' ', req.path, ' ', 'error: ', err)
  res.status(err.status || 500)
  res.send(err)
})

if (!module.parent) {
  app.listen(port, () => console.log('API Running on port:', port))
}

module.exports = app
