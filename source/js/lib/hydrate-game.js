import Weiqi from 'weiqi'

export default function hydrate (game) {
  var Game = Weiqi.createGame(game.size)
  return Game
}