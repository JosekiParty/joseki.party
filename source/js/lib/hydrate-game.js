import Weiqi from 'weiqi'

export default function hydrate (game) {
  var Game = Weiqi.createGame(game.size)
  for (let i = 0; i < game.history.length; i++) {
    var color = game.history[i].color
    if (game.history[i].pass) {
      Game = Game.pass(Weiqi[color])
    } else {
      var coords = [game.history[i].y, game.history[i].x]
      Game = Game.play(Weiqi[color], coords)
    }
  }
  window.Game = Game
  console.log(Weiqi)
  return Game
}