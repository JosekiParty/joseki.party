export default function (game, them) {
  return `
    <label class="board-invite">
      Invite your opponent:
      <div class="flex">
        <input type="text"
               class="js-invite-input flex-1 input-text board-invite-input"
               value="joseki.party/${game.name}/${them}/"
               autocomplete="off" autocorrect="off"
               autocapitalize="off"
               spellcheck="false">
        <button class="js-invite-btn btn board-invite-btn">Copy</button>
      </div>
    </label>
  `
}

