import Weiqi from 'weiqi'

export default function hydrate (game) {
  function isEven(n) {
    return n === parseFloat(n)? !(n%2) : void 0;
  }

  var Go = Weiqi.createGame(game.size)
  for (let i = 0; i < game.history.lenth; i++) {
    if (!isEven(i)) {
      Go.BLACK(game.history[i])
    } else {
      Go.WHITE(game.history[i])
    }
  }

  game.goban = Go.getBoard().toArray()

  return game
}