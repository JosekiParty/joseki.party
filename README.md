# joseki.party

> Play Go online for free.

## URLS

| url | description |
| --- | ----------- |
| `/` | homepage with fun background and one large "start game" button |
| `/:game_id` | game play screen. set up game (size, komi, color) and hit "play" |

## Install

```
npm install
```

Installs all dependencies.

## Develop

```
npm start
```

Uses [Babel](https://babeljs.io/) and [Browserify](http://browserify.org/) to build JavaScript, compiles CSS with [myth](http://www.myth.io/), minifies images that have changed with [imagemin-newer](https://github.com/paulcpederson/imagemin-newer/), and runs a local server with [live-server](https://www.npmjs.com/package/live-server).

## Test

```
npm test
```

For now, tests whether js complies with [Standard](https://github.com/feross/standard).

## Deploy

```
npm run deploy
```

Deploys site to [joseki.party](http://joseki.party) with [surge.sh](https://surge.sh/).