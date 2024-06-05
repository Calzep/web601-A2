//SECTION functions

const discard = () => {
    window.location.replace("../landing/landing.html")
}

const logout = () => {
    console.log("not implemented")
}

const save = async (event) => {
    event.preventDefault()

    let formData = new FormData(newNoteForm)

    let requestOptions = {
        method: 'POST',
        body: formData
    }

    await fetch(apiUrl, requestOptions)
        .then(res => {
            if(!res.ok) {
                throw new Error('Network response was not OK')
            }
            return res.text()
        })
        .then(data => {//REVIEW Place user notifications here!
            console.log("Data", data)
            window.location.href = "../landing/landing.html"
        })
        .catch(err => {
            console.error('Error:', err)
        })
}

//SECTION variables and constants
import config from '../config/config.js'

const apiUrl = config.server + config.api + config.notesRoute


const discardBtn = document.getElementById('discardBtn')
const logoutBtn = document.getElementById('logoutBtn')
const newNoteForm = document.getElementById('newNoteForm')

//SECTION event listeners

discardBtn.addEventListener('click', discard)
logoutBtn.addEventListener('click', logout)
newNoteForm.addEventListener('submit', save)