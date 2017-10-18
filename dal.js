require('dotenv').config()
const PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-find'))
const dbName = process.env.COUCH_DB
const couchDBURL = process.env.COUCH_URL

console.log(process.env.COUCH_URL + process.env.COUCH_DB)

const db = new PouchDB(couchDBURL + dbName)

const pkGenerator = require('./lib/build-pk')
const { trim } = require('ramda')

// HELPERS

// const add = doc => db.put(doc)
// const get = id => db.get(id)
// const update = doc => db.put(doc)
// const deleteDoc = id => db.get(id).then(doc => db.remove(doc))

// PLAYERS

const addPlayer = player => {
  player._id = pkGenerator('player_', trim(player.name))
  return db.put(player)
}
const getPlayer = id => {
  return db.get(id)
}
const updatePlayer = player => {
  return db.put(player)
}
const deletePlayer = id => {
  return db.get(id).then(player => db.remove(player))
}

const dal = {
  addPlayer,
  getPlayer,
  updatePlayer,
  deletePlayer
}

module.exports = dal
