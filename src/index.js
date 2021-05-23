const BASE_URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd"

const mainPage = document.getElementById('main')
const cryptoList = document.querySelector('cryptolist')


fetch(BASE_URL)
.then(res => res.json())
.then(
  (crypto) => {
  crypto.forEach((coin) => {
    createTile(coin)
    console.log(coin)
  })
})

function createTile(tile) {
    const newTile = document.createElement("div")
    const hTag = document.createElement('h2')
    const pTag = document.createElement('p')
    const btnTag = document.createElement('button')
    const imgTag = document.createElement('img')
    btnTag.id = tile.id
    imgTag.src = tile.image
    pTag.innerText = `Current Value : $${tile.current_price}`
    btnTag.innerText = 'More Info'
    hTag.innerText = tile.name
    newTile.append(hTag, imgTag, pTag, btnTag)
    mainPage.appendChild(newTile)
  }