import Weiqi from 'weiqi'

export default function hydrate (game) {
  var Game = Weiqi.createGame(game.size)
  for (let i = 0; i < game.history.length; i++) {
    if (game.history[i]) {
      console.log(game.history[i])
      if (game.last == 'pass') {
        var color = game.history[i].color
        Game = Game.pass(Weiqi[color], coords)
      } else if (game.last == 'resign') {
        var color = game.history[i].color
        console.log(`${color} resigned because they're a whiny quitter`)
      } else {
        var coords = [game.history[i].y, game.history[i].x]
        var color = game.history[i].color
        Game = Game.play(Weiqi[color], coords)
      }
    }
  }
  return Game
}