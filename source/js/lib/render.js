import bus from './bus'
import inviteOpponent from '../templates/invite-opponent'
import playerControl from '../templates/player-control'

function render (game) {
  // current player color lives at `game.me`
  var rows = game.goban.map((r, y) => {
    var row = r.map((n, x) => {
      var isLast = game.last[0] === y && game.last[1] === x ? 'node-last' : ''
      var nodeClass = `js-node node ${isLast} `
      if (n === 'o') {
        nodeClass += 'node-white'
      } else if (n === 'x') {
        nodeClass += 'node-black'
      } else {
        nodeClass += 'node-empty'
      }
      return `<a href="" class="${nodeClass}" data-x="${x}" data-y="${y}"></a>`
    })
    return `<div class="board-row">${row.join('')}</div>`
  })

  let full = game.joined && game.joined.black && game.joined.white ? 'board-full' : ''
  let them = game.me === 'white' ? 'black' : 'white'
  document.querySelector('.js-board').innerHTML = `
    ${playerControl(game.me)}
    <section class="board board-purple
                    ${full}
                    board-turn-${game.turn}
                    board-${game.size}x${game.size}">
      ${inviteOpponent(game, them)}
      ${rows.join('')}
    </section>
    ${playerControl(them)}
  `
}

export default render
