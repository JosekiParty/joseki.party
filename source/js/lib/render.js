import bus from './bus'

function render (game) {
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
  document.querySelector('.js-board').innerHTML = `
    <section class="board board-purple ${full} board-turn-${game.turn} board-${game.size}x${game.size}">
      <label class="board-invite">
        Invite your opponent:
        <div class="flex">
          <input type="text" class="js-invite-input flex-1 input-text board-invite-input" value="joseki.party/whatever-cool-domain/black/" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
          <button class="js-invite-btn btn board-invite-btn">copy</button>
        </div>
      </label>
      ${rows.join('')}
    </section>
  `
}

export default render
