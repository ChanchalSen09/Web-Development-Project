const Clock = document.getElementsByClassName(`Clock`)[0];
setInterval(function () {
  Clock.innerHTML = new Date().toLocaleTimeString();
}, 1000);
