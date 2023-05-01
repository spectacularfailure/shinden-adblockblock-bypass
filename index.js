// ==UserScript==
// @name        Shinden AdBlock blocker bypass
// @include      /^https?://shinden.pl/(episode|epek)/*/
// @grant       none
// @require     https://code.jquery.com/jquery-3.6.4.min.js
// @version     1.2
// @author      @spectacularfailure & @nextu1337
// @description Naprawiona wersja skryptu bypassującego adblock blocka do Shindena
// ==/UserScript==

const apiUrl = "https://api4.shinden.pl"

function loadPlayer(playerId) {
  const auth = _Storage.basic
  $.ajax({
    url: `${apiUrl}/xhr/${playerId}/player_load?auth=${auth}`,
    xhrFields: {
      withCredentials: true
    }
  })

  setTimeout(() => {
    $.ajax({
      url: `${apiUrl}/xhr/${playerId}/player_show?auth=${auth}&width=765&height=-1`,
      xhrFields: {
        withCredentials: true
      },
      success: (data) => {
          $('#player-block').html(data);
      }
    })
  }, 6000)
}

jQuery(document).ready(function () {
  $("a[id*='player_data']").on("click", event => {
    $('#player-block').html("<label>Proszę poczekać 6 sekund....</label>");

    dataEpisode = JSON.parse($(event.target).attr("data-episode"))

    loadPlayer(dataEpisode["online_id"])
  })
});