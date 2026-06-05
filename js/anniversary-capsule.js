(function () {
  'use strict';

  var envelopeEl = document.getElementById('ann-envelope');
  if (!envelopeEl) return;

  envelopeEl.addEventListener('click', function () {
    envelopeEl.classList.toggle('open');
  });

  // Countdown to next May 5 anniversary
  function updateCountdown() {
    var now  = new Date();
    var next = new Date(now.getFullYear(), 4, 5); // May = month 4
    if (now >= next) next = new Date(now.getFullYear() + 1, 4, 5);

    var diff = next - now;
    var d = Math.floor(diff / 86400000);
    var h = Math.floor((diff % 86400000) / 3600000);
    var m = Math.floor((diff % 3600000)  / 60000);
    var s = Math.floor((diff % 60000)    / 1000);

    var dEl = document.getElementById('ann-cd-d');
    var hEl = document.getElementById('ann-cd-h');
    var mEl = document.getElementById('ann-cd-m');
    var sEl = document.getElementById('ann-cd-s');

    if (dEl) dEl.textContent = String(d).padStart(2, '0');
    if (hEl) hEl.textContent = String(h).padStart(2, '0');
    if (mEl) mEl.textContent = String(m).padStart(2, '0');
    if (sEl) sEl.textContent = String(s).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}());
