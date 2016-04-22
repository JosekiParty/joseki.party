import bus from './bus'

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
  console.log(game)
  let them = game.me === 'white' ? 'black' : 'white'
  document.querySelector('.js-board').innerHTML = `

    <section class="player text-left">
      <span class="player-marker player-black"></span>
      <span class="player-black-pass-indicator js-black-pass-indicator" hidden>Pass</span>

      <div class="black-controls">
        <div class="pass-resign js-black-pass-resign">
          <button class="btn btn-small btn-pass js-pass-black">Pass</button><button class="btn btn-small btn-resign js-resign-black">Resign</button>
        </div>
        <div class="resign-confirm js-black-resign-confirm" hidden>
          <button class="btn btn-small btn-confirm js-black-cancel-resign">No, Wait, Don't</button><button class="btn btn-small btn-resign js-confirm-resign-black">Yes Really</button>
        </div>
      </div>
    </section>

    <section class="board board-purple ${full} board-turn-${game.turn} board-${game.size}x${game.size}">
      <label class="board-invite">
        Invite your opponent:
        <div class="flex">
          <input type="text" class="js-invite-input flex-1 input-text board-invite-input" value="joseki.party/${game.name}/${them}/" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
          <button class="js-invite-btn btn board-invite-btn">Copy</button>
        </div>
      </label>
      ${rows.join('')}
    </section>

    <section class="player">
      <span class="komi"></span>
      <span class="player-marker player-white"></span>
      <span class="player-white-pass-indicator js-white-pass-indicator" hidden>Pass</span>

      <div class="white-controls">
        <div class="pass-resign-white js-white-pass-resign">
          <button class="btn btn-small btn-pass js-pass-white">Pass</button><button class="btn btn-small btn-resign js-resign-white">Resign</button>
        </div>
        <div class="resign-confirm-white js-white-resign-confirm" hidden>
          <button class="btn btn-small btn-confirm js-white-cancel-resign">No, Wait, Don't</button><button class="btn btn-small btn-resign js-confirm-resign-white">Yes Really</button>
        </div>
      </div>
    </section>
  `
}

export default render
