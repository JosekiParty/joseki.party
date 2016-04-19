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

  document.querySelector('.js-board').innerHTML = `
    <section class="board board-turn-${game.turn} board-${game.size}x${game.size}">
      ${rows.join('')}
    </section>
  `

  var nodes = document.querySelectorAll('.js-node')
  for (let i = 0; i < nodes.length; i++) {
    let node = nodes[i]
    node.addEventListener('click', (e) => {
      e.preventDefault()
      bus.emit('game:play', e.target)
    })
  }
}

export default render
