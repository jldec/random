const fetch = require('node-fetch')

var url = process.env['target-url'] || 'http://echo.default.svc.cluster.local'
var freq = 1
var timer = null

//  post random int < 1000 to url at freq and url
// input config = { url:xxx, freq:n }
module.exports = config => {
  clearTimer();
  if (config.hasOwnProperty('url')) { url = config.url }
  if (config.hasOwnProperty('freq')) { freq = config.freq }
  if (freq && url) { // stop if freq is falsy
    timer = setInterval(doPost, 1000/freq)
    console.log('posting to %s %s/s', url, freq)
  }
  else {
    console.log('NOT posting to %s %s/s', url, freq)
  }
}

function doPost() {
  const num = ~~(Math.random()*1000) // random 0-999
  fetch(url, {
    method: 'POST',
    body: num,
    headers: { 'Content-Type': 'application/json' }
  })
  .then(res => console.log('posted %s to %s %s', num, url, res.status))
  .catch(err => {
    console.log(err)
    clearTimer() // don't retry after error
  })
}

function clearTimer() {
  clearInterval(timer)
  timer = null
}

module.exports.$destroy = clearTimer()