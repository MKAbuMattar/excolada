if (`serviceWorker` in navigator) {
  window.addEventListener(`load`, () => {
    navigator.serviceWorker.register(`./sw.js`).then((registration) => {
      console.log(`ServiceWorker registration successful with scope: `, registration
        .scope)
    }, (err) => {
      console.log(`ServiceWorker registration failed: `, err)
    })
  })
}


let deferredPrompt
const addBtn = document.querySelector(`.add-button`)
addBtn.style.display = `none`

window.addEventListener(`beforeinstallprompt`, (e) => {
  e.preventDefault()
  deferredPrompt = e
  addBtn.style.display = `block`
  addBtn.addEventListener(`click`, (e) => {
    addBtn.style.display = `none`
    deferredPrompt.prompt()
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === `accepted`) {
        console.log(`User accepted the A2HS prompt`)
      } else {
        console.log(`User dismissed the A2HS prompt`)
      }
      deferredPrompt = null
    })
  })
})

window.addEventListener(`beforeinstallprompt`, (beforeInstallPromptEvent) => {
  beforeInstallPromptEvent.preventDefault()
  installButton.addEventListener(`click`, (mouseEvent) => {
    beforeInstallPromptEvent.prompt()
  })
  installButton.hidden = false
})