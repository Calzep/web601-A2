//SECTION functions

const discard = () => {
    window.location.replace("../landing/landing.html")
}

const logout = () => {
    console.log("not implemented")
}

//SECTION variables and constants

const discardBtn = document.getElementById('discardBtn')
const logoutBtn = document.getElementById('logoutBtn')

//SECTION event listeners

discardBtn.addEventListener('click', discard)
logoutBtn.addEventListener('click', logout)