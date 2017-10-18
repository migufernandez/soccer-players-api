require('dotenv').config()
const PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-find'))
const dbName =
  process.env.NODE_ENV === 'test'
  ? process.env.COUCHDB
  : process.env.COUCHDB
const couchDBURL =
  process.env.NODE_ENV === 'test'
  ? process.env.COUCHDB
  : process.env.COUCHDB

console.log(dbName + couchDBURL)

const db = new PouchDB(couchDBURL + dbName)
const {} = require('ramda')

// HELPERS

const add = doc => db.put(doc)
const get = id => db.get(id)
const update = doc => db.put(doc)
const deleteDoc = id => db.get(id).then(doc => db.remove(doc))

// PLAYERS

const addPlayer =
const getPlayer =
const updatePlayer =
const deletePlayer = 

const listPlayers
