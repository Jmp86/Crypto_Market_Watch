const BASE_URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd"

const mainPage = document.getElementById('main')
const selectedCrypto = document.getElementById('crypto')


fetch(BASE_URL)
.then(res => res.json())
.then((crypto) => {
    crypto.forEach((coin) => {
    createTile(coin)
  })
})

function createTile(tile) {
    const newTile = document.createElement("div")
    const hTag = document.createElement('h2')
    const pTag = document.createElement('p')
    const btnTag = document.createElement('button')
    const imgTag = document.createElement('img')
    newTile.classList.add('tile')
    imgTag.classList.add('logo')
    btnTag.id = tile.id
    imgTag.src = tile.image
    pTag.innerText = `Current Value : $${tile.current_price}`
    btnTag.innerText = 'More Info'
    hTag.innerText = tile.name
    newTile.append(hTag, imgTag, pTag, btnTag)
    mainPage.appendChild(newTile)
    btnTag.addEventListener('click', (e) => {
      cryptoSelect(tile)
    })
  }

  function cryptoSelect(select) {
    fetch(BASE_URL)
    .then(res => res.json())
    .then((crypto) => {
      moreInfo(select)
      // console.log(select)
    })
  
}

function moreInfo (info) {
  mainPage.innerHTML = ''
  const singleTile = document.createElement("div")
  const hTag = document.createElement('h2')
  const pTag = document.createElement('p')
  const imgTag = document.createElement('img')
  singleTile.classList.add('single')
  imgTag.classList.add('logo')
  imgTag.src = info.image
  pTag.innerText = `Current Value : $${info.current_price}`
  hTag.innerText = info.name
  for (const [key, value] of Object.entries(info)) {
    listInfo(`${key}: ${value}`);
  }
  singleTile.append(hTag, imgTag, pTag, selectedCrypto)
  mainPage.appendChild(singleTile)
}

function listInfo (list){
  const li = document.createElement("li")
  li.classList.add('details')
  li.innerText = list
  selectedCrypto.appendChild(li)
}
