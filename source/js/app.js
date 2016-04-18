import bus from './bus'
import parseRoute from './routing'
import model from './model'
import intent from './intent'
import render from './render'

// Where are we tho?
// parseRoute()

// set up the model
// model()

bus.on('game:new', game => console.log(game))

