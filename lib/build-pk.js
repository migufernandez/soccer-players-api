const { compose, replace, toLower, trim, concat } = require('ramda')

module.exports = (prefix, value) => {
  // prefix: player_
  // value: "Cristiano Ronaldo"
  // returns: "player_cristiano_ronaldo"

  return compose(concat('player_'), replace(/ /g, '_'), trim, toLower())(value)
}
