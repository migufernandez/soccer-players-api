require('dotenv').config()

const express = require('express')
const app = express()
const dal = require('./dal.js')
const port = process.env.PORT || 4000
const NodeHTTPError = require('node-http-error')
const bodyParser = require('body-parser')
const { prop, path, isEmpty, join } = require('ramda')

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
      new NodeHTTPError(400, 'Missing Required Fields', {
        fields: arrFieldsFailedValidation
      })
    )
  }
  if (path(['body', 'type'], req) !== 'player') {
    return next(
      new NodeHTTPError(400, "'type' field value must be equyal to 'player'")
    )
  }
  dal
    .addPlayer(prop('body', req))
    .then(addedPlayer => res.status(201).send(addedPlayer))
    .catch(err => next(new NodeHTTPError(err.status, err.message, err)))
})
// READ - GET /players/:id
app.get('/players/:id', function(req, res, next) {
  dal
    .getPlayer(path(['params', 'id'], req))
    .then(player => res.status(200).send(player))
    .catch(err => next(new NodeHTTPError(err.status, err.message, err)))
})
// UPDATE -  PUT /cats/:id
app.put('/players/:id', function(req, res, next) {
  if (req.params.id === req.body._id) {
    const arrFieldsFailedValidation = checkRequiredFields(
      [
        '_id',
        '_rev',
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
    if (isEmpty(arrFieldsFailedValidation)) {
      dal
        .updatePlayer(prop('body', req))
        .then(result => res.status(200).send(result))
        .catch(err => next(new NodeHTTPError(err.status, err.message)))
    } else {
      return next(
        new NodeHTTPError(
          400,
          `Missing Required Fields in Requested Body: ${join(
            ',',
            arrFieldsFailedValidation
          )}`
        )
      )
    }
  } else {
    next(
      new NodeHTTPError(400, `Player id in path does not match _id in body.`)
    )
  }
})

// DELETE - DELETE /players/:id
app.delete('/players/:id', (req, res, next) => {
  dal
    .deletePlayer(path(['params', 'id'], req))
    .then(result => res.status(200).send(result))
    .catch(err => next(new NodeHTTPError(err.status, err.message)))
})

// LIST - GET /cats

app.use(function(err, req, res, next) {
  console.log(req.method, ' ', req.path, ' ', 'error: ', err)
  res.status(err.status || 500)
  res.send(err)
})

if (!module.parent) {
  app.listen(port, () => console.log('API Running on port:', port))
}

module.exports = app
