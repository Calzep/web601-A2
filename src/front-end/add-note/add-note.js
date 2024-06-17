//SECTION functions

//Abandon note creation
const discard = () => {

    //Set URL params to display toast notification on landing page
    var params = new URLSearchParams()
    params.append("notif", "createDiscard")
    window.location.href = "../landing/landing.html?" + params.toString()
}

const logout = () => {
    console.log("not implemented")
}

const save = async (event) => {
    event.preventDefault()

    //Retrieve data from form inputs
    let formData = new FormData(newNoteForm)

    //Prepare API call options
    let requestOptions = {
        method: 'POST',
        headers: {
            'authorization': 'Bearer ' + localStorage.getItem('accessToken')
        },
        body: formData
    }

    //Attempt to call post api
    await fetch(apiUrl, requestOptions)
        .then(res => {
            if(!res.ok) {
                throw new Error('Network response was not OK')
            }
            return res.text()
        })
        .then(data => {
            //If successful, redirect to landing page and display success notification
            console.log("Data", data)

            //Parameters for toast notifications
            var params = new URLSearchParams()
            params.append("notif", "createSuccess")
            window.location.href = "../landing/landing.html?" + params.toString()
        })
        .catch(err => {
            //If unsuccessful, display an error notification and remain on page
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