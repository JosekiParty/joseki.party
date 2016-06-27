// import bus from './lib/bus'
// import generateName from './lib/generate-name'
// import serialize from 'form-serialize'
// import matches from 'dom-matches'

// document.querySelector('.js-new-game').addEventListener('click', e => {
//   e.preventDefault
//   let name = generateName()
//   history.pushState({}, name, `/${name}/`);
// })

// // Create Game form submissions
// document.querySelector('.js-new-game-form').addEventListener('submit', e => {
//   e.preventDefault()
//   let game = serialize(e.target, {hash: true})
//   game.komi = parseInt(game.komi)
//   game.size = parseInt(game.size)
//   game.name = window.location.pathname.replace('/', '')
//   game.name = game.name.replace('/', '')
//   bus.emit('game:new', game)
// })


// document.querySelector('.js-board').addEventListener('click', e => {
//   e.preventDefault()
//   if (matches(e.target, '.js-node')) {
//     let x = parseInt(e.target.getAttribute('data-x'))
//     let y = parseInt(e.target.getAttribute('data-y'))
//     bus.emit('game:play', x, y)
//   }
//   if (matches(e.target, '.js-invite-btn')) {
//     let input = document.querySelector('.js-invite-input')
//     bus.emit('game:copy-url', input)
//   }
//   if (matches(e.target, '.js-pass')) {
//     e.preventDefault()
//     var color = e.target.getAttribute("data-color")
//     bus.emit('game:pass', color)
//   }
// })