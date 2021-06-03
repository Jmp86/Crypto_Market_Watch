document.addEventListener("DOMContentLoaded", () => {

const BASE_URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd"

const mainPage = document.getElementById('main')
const selectedCrypto = document.getElementById('crypto')
const divTag = document.getElementById('logout')

function renderCrypto() {
  mainPage.innerHTML = ''
  divTag.innerHTML = ''
  fetch(BASE_URL)
  .then(res => res.json())
  .then((crypto) => {
    logOut()
    crypto.forEach((coin) => {
      // console.log(coin)
    createTile(coin)
  })
})
document.body.style.backgroundImage = "url('http://prod-upp-image-read.ft.com/0fcf7cf8-3fb5-11e7-9d56-25f963e998b2')"
}


function createTile(tile) {
    const newTile = document.createElement('div')
    const hTag = document.createElement('h2')
    const pTag = document.createElement('p')
    const imgTag = document.createElement('img')
    const aTag = document.createElement('a')
    aTag.classList.add('click-tile')
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
      console.log(select)
      moreInfo(select)
  }) 
}

function moreInfo (info) {
  mainPage.innerHTML = ''
  const singleTile = document.createElement('div')
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
    selectedCrypto.innerHTML = ''
    renderCrypto()
  })
  document.body.style.backgroundImage = "url('https://blog.binary.com/content/images/size/w2000/2017/05/Ethereum-homestead-background-10.jpg')"
  singleTile.append(hTag, imgTag, pTag, selectedCrypto, btnTag)
  mainPage.append(singleTile)
}

function listInfo (list){
  const li = document.createElement('li')
  li.classList.add('details')
  li.innerText = list
  selectedCrypto.appendChild(li)
}

function loginPage(){
  mainPage.innerHTML = ''
  divTag.innerHTML = ''
  selectedCrypto.innerHTML = ''
  signUp()
  const loginForm = document.createElement('form')
  loginForm.innerHTML += `
  <h2>Log In</h2>
  <label>Username:</label>
  <input type="text">
  <br>
  <label>Password:</label>
  <input type="text">
  <br>
  <input type="submit">`
  document.body.style.backgroundImage = "url('https://static.coindesk.com/wp-content/uploads/2018/08/etcrbcb-scaled.jpg')"
  loginForm.addEventListener('submit', userLogin)
  mainPage.append(loginForm)
}

function signUp(){
  const signUpForm = document.createElement('form')
  signUpForm.innerHTML += `
  <h2>Sign Up</h2>
  <label>Create Username:</label>
  <input type="text">
  <br>
  <label>Create Password:</label>
  <input type="text">
  <br>
  <input type="submit">`
  mainPage.append(signUpForm)

  signUpForm.addEventListener('submit', (e) => {
    e.preventDefault()
    // console.log(e.target)
    fetch(`http://localhost:3000/users`, {
        method: "POST", 
        headers: {
            "Content-type": "application/json", 
            "Accept": "application/json"
        }, 
        body: JSON.stringify({
          "username": e.target.children[2].value,
          "password": e.target.children[5].value,

        })
    })
    .then(res => res.json())
    .then(
      logOut(),
      renderCrypto(),
      alert(`Thanks for signing up ${e.target.children[2].value}`)
    )
  })
}  

function userLogin(e){
  e.preventDefault()
  const username = e.target.children[2].value
  const password = e.target.children[5].value

  fetch(`http://localhost:3000/users?name=${username}&password=${password}`)
  .then(res => res.json())
  .then(data => {
      if(data.length === 0){
          alert('Incorrect Username or Password')
      } else {
          renderCrypto()
      }
  })
}

function logOut (){
  const btnTag = document.createElement('button')
  btnTag.innerText = 'Log Out'
  btnTag.addEventListener('click', (e) => {
    loginPage()
  })
  divTag.appendChild(btnTag)
}

loginPage()

})