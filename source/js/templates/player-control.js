export default function (color) {
  return `
    <section class="player">

      <h1 class="text-center pass-indicator" data-passed="${color}">Pass</h1>

      <span class="player-marker player-${color}"></span>

      <div class="text-center actions actions-${color}">
        <p>
          <a href="#" class="btn btn-large js-pass" data-color="${color}">Pass</a>
        </p>
        <p>
          <a href="#" class="btn btn-small btn-clear js-resign" data-color="${color}">Resign</a>
        </p>
      </div>
    </section>
  `
}
