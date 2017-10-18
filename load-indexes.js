require('dotenv').config()
const PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-find'))

const db = new PouchDB(process.env.COUCH_URL + process.env.COUCH_DB)

db
  .createIndex({ index: { fields: ['name'] } })
  .then(result => console.log('Created an index on the type field.'))
  .catch(err => console.log(err))

db
  .createIndex({ index: { fields: ['type'] } })
  .then(result => console.log('Created an index on the name field.'))
  .catch(err => console.log(err))
