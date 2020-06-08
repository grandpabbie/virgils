/**
 *Initialize the virgil functions on startup, when DOMContentIsReady
 *
 */
function init() {
  const virgilButton = document.querySelector('#virgil_button')
  const doneImage = document.querySelector('#done')


  virgilButton.addEventListener('click', () => {


    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {
        type: 'virgilify'
      }, (response) => {
        console.log('Response from Content script', response)
        // when done, remove the button and show the done image
        virgilButton.style.display = 'none';
        doneImage.style.display = 'block';
      })
    });


  })

}


document.addEventListener('DOMContentLoaded', ()=> {
  init()
})
