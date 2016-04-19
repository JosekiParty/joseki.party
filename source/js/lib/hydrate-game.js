import Weiqi from 'weiqi'

export default function hydrate (game) {
  var Game = Weiqi.createGame(game.size)
  for (let i = 0; i < game.history.length; i++) {
    if (game.history[i]) {
      var coords = [game.history[i].y, game.history[i].x]
      var color = game.history[i].color
      Game = Game.play(Weiqi[color], coords)
    }
  }
  return Game
}