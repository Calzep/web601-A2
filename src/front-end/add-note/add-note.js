//SECTION functions

const discard = () => {
    //Params for toast notification
    var params = new URLSearchParams()
    params.append("notif", "createDiscard")
    window.location.replace("../landing/landing.html?" + params.toString())
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

            //Parameters for toast notifications
            var params = new URLSearchParams()
            params.append("notif", "createSuccess")
            window.location.href = "../landing/landing.html?" + params.toString()
        })
        .catch(err => {
            console.error('Error:', err)

            //Display toast notification
            toastAlert.classList.add('text-bg-danger')
            toastText.innerHTML = '<strong>Error!</strong> Unable to save note.'
            const toast = new bootstrap.Toast(toastAlert)
            toast.show()
        })
}

//SECTION variables and constants
import config from '../config/config.js'

const apiUrl = config.server + config.api + config.notesRoute


const discardBtn = document.getElementById('discardBtn')
const logoutBtn = document.getElementById('logoutBtn')
const newNoteForm = document.getElementById('newNoteForm')
const toastAlert = document.getElementById('toastAlert')
const toastText = document.getElementById('toastText')

//SECTION event listeners

discardBtn.addEventListener('click', discard)
logoutBtn.addEventListener('click', logout)
newNoteForm.addEventListener('submit', save)