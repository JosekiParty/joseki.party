import Emitter from 'tiny-emitter'

var bus = new Emitter()
bus.on('view:set', e => (console.log(`view:set`, e)))
bus.on('game:end', e => (console.log(`game:end`, e)))
bus.on('game:new', e => (console.log(`game:new`, e)))
bus.on('game:play', e => (console.log(`game:play`, e)))
bus.on('game:copy-url', e => (console.log(`game:copy-url`, e)))
bus.on('game:pass', e => (console.log(`game:pass`, e)))
bus.on('game:resign', e => (console.log(`game:resign`, e)))
bus.on('game:resign:cancel', e => (console.log(`game:resign:cancel`, e)))
bus.on('game:resign:confirm', e => (console.log(`game:resign:confirm`, e)))
bus.on('game:over', e => (console.log(`game:over`, e)))

export default bus
