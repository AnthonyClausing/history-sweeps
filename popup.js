let cleanButton = document.getElementById('clean')
let input = document.getElementById('query')
let timeOptions = document.getElementById('time-options')
const timeLapses = {
  '1 day' : 86400000,
  '7 days': 604800000,
  '1 month': 2628000000,
  'All Time': 94610000000 // 3 years
}
input.addEventListener('input', function(evt){
  cleanButton.disabled = !evt.target.value
})
cleanButton.addEventListener('click', onSubmit)
function onSubmit(evt){
  evt.preventDefault()
  cleanButton.disabled = true
  //Maybe if(historyItem.url.includes(input.value)) delete so e.g('facebook' deletes facebook.com instead of an article about facebook)
  chrome.history.search({startTime: Date.now() - timeLapses[timeOptions.value], text: input.value }, function(res) {
    res.forEach(historyItem => chrome.history.deleteUrl({url: historyItem.url}, () => console.log(`done with ${historyItem.url}`)))
  })
  input.value = ''
}