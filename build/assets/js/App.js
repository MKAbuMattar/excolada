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

const mybutton = document.getElementById(`myBtn`)

mybutton.addEventListener(`click`, () => {
  document.body.scrollTop = 0
  document.documentElement.scrollTop = 0
})

const scrollFunction = () => {
  if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
    mybutton.style.display = `block`
  } else {
    mybutton.style.display = `none`
  }
}

window.onscroll = () => {
  scrollFunction()
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