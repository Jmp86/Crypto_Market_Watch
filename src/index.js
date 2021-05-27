const BASE_URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd"

const mainPage = document.getElementById('main')
const selectedCrypto = document.getElementById('crypto')


function renderCrypto() {
fetch(BASE_URL)
.then(res => res.json())
.then((crypto) => {
    crypto.forEach((coin) => {
    createTile(coin)
  })
})
}

renderCrypto()

function createTile(tile) {
    const newTile = document.createElement("div")
    const hTag = document.createElement('h2')
    const pTag = document.createElement('p')
    const imgTag = document.createElement('img')
    const aTag = document.createElement('a')
    aTag.classList.add('click-tile')
    newTile.classList.add('tile')
    imgTag.classList.add('logo')
    aTag.href = '#'
    imgTag.src = tile.image
    pTag.innerText = `Current Value : $${tile.current_price}`
    hTag.innerText = tile.name
    newTile.append(hTag, imgTag, pTag)
    aTag.appendChild(newTile)
    mainPage.appendChild(aTag)
    aTag.addEventListener('click', (e) => {
      cryptoSelect(tile)
    })
  }

  function cryptoSelect(select) {
    fetch(BASE_URL)
    .then(res => res.json())
    .then((crypto) => {
      moreInfo(select)
      console.log(select)
    })
  
}

function moreInfo (info) {
  mainPage.innerHTML = ''
  const singleTile = document.createElement("div")
  const hTag = document.createElement('h2')
  const pTag = document.createElement('p')
  const imgTag = document.createElement('img')
  const btnTag = document.createElement('button')
  singleTile.classList.add('single')
  imgTag.classList.add('logo')
  imgTag.src = info.image
  pTag.innerText = `Current Value : $${info.current_price}`
  hTag.innerText = info.name
  btnTag.innerText = 'Return'
  for (const [key, value] of Object.entries(info)) {
    listInfo(`${key}: ${value}`);
  }
  btnTag.addEventListener('click', (e) => {
    mainPage.innerHTML = ''
    selectedCrypto.innerHTML = ''
    renderCrypto()
  })
  singleTile.append(hTag, imgTag, pTag, selectedCrypto, btnTag)
  mainPage.append(singleTile)
}

function listInfo (list){
  const li = document.createElement("li")
  li.classList.add('details')
  li.innerText = list
  selectedCrypto.appendChild(li)
}
