require('dotenv').config()
const PouchDB = require('pouchdb')
const db = new PouchDB(process.env.COUCH_URL + process.env.COUCH_DB)

const players = [
  {
    _id: 'player_cristiano_ronaldo',
    name: 'Cristiano Ronaldo',
    nationality: 'Portuguese',
    yearBorn: 1985,
    position: 'forwarder',
    goals: 998,
    titles: 14,
    club: { name: 'Real Madrid', location: 'Madrid' },
    type: 'player'
  },
  {
    _id: 'player_lionel_messi',
    name: 'Lionel Messi',
    nationality: 'Argentinian',
    yearBorn: 1987,
    position: 'forwarder',
    goals: 678,
    titles: 11,
    club: { name: 'Barcelona Futbol club', location: 'Barcelona' },
    type: 'player'
  },
  {
    _id: 'player_neymar_da_silva',
    name: 'Neymar da Silva',
    nationality: 'Brazilian',
    yearBorn: 1992,
    position: 'forwarder',
    goals: 556,
    titles: 9,
    club: { name: 'PSG', location: 'Paris' },
    type: 'player'
  },
  {
    _id: 'player_marco_asensio',
    name: 'Marco Asensio',
    nationality: 'Spanish',
    yearBorn: 1996,
    position: 'forwarder',
    goals: 45,
    titles: 3,
    club: { name: 'Real Madrid', location: 'Madrid' },
    type: 'player'
  },
  {
    _id: 'player_isco_alarcon',
    name: 'Isco Alarcon',
    nationality: 'Spanish',
    yearBorn: 1992,
    position: 'forwarder',
    goals: 360,
    titles: 6,
    club: { name: 'Real Madrid', location: 'Madrid' },
    type: 'player'
  },
  {
    _id: 'player_sergio_ramos',
    name: 'Sergio Ramos',
    nationality: 'Spanish',
    yearBorn: 1986,
    position: 'forwarder',
    goals: 233,
    titles: 10,
    club: { name: 'Real Madrid', location: 'Madrid' },
    type: 'player'
  },
  {
    _id: 'player_diego_maradona',
    name: 'Diego Maradona',
    nationality: 'Argentinian',
    yearBorn: 1960,
    position: 'forwarder',
    goals: 578,
    titles: 12,
    club: { name: 'Napoli', location: 'Naples' },
    type: 'player'
  },
  {
    _id: 'player_alfredo_di_stefano',
    name: 'Alfredo di Stefano',
    nationality: 'Argentinian',
    yearBorn: 1985,
    position: 'forwarder',
    goals: 999,
    titles: 15,
    club: { name: 'Real Madrid', location: 'Madrid' },
    type: 'player'
  }
]

db
  .bulkDocs(players)
  .then(result => console.log(result))
  .catch(err => console.log(err))
