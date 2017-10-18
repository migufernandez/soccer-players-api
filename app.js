require('dotenv').config()

const express = require('express')
const app = express()
const dal = require('./dal.js')
const port = process.env.PORT || 4000
const HTTPError = require('node-http-error')
const bodyParser = require('body-parser')
const {} = require('ramda')

const checkRequiredFields = require('./lib/check-required-fields')

app.use(bodyParser.json())

app.get('/', function(req, res, next) {
  res.send('Welcome to the Soccer Players API!')
})
