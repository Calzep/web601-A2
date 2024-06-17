//SECTION functions

//Attempts to load the note selected on the ladning page
const load = async () => {
    //Gets the targeted note through URL parameters
    var params = new URLSearchParams(window.location.search)
    id = params.get("id")

    //Attempts to call GET api
    try {
        let response = await fetch(`${apiUrl}/${id}`)
        if(!response.ok) {
            throw new Error('Network response was not OK')
        }

        //if successful, populate form with note data
        let note = await response.json()
        console.log(note)
        titleEntry.value = note.title
        contentEntry.value = note.content

    } catch (err) {
        //if unsuccessful, display an error notification
        console.error("Error retrieving notes", err)
        
        //Display toast notification
        toastAlert.classList.add('text-bg-danger')
        toastText.innerHTML = '<strong>Error!</strong> Unable to fetch note for editing.'
        const toast = new bootstrap.Toast(toastAlert)
        toast.show()
    }
}

//Abandons note edits
const discard = () => {
    //Parameters for toast notifications
    var params = new URLSearchParams()
    params.append("notif", "editDiscard")
    window.location.href = "../landing/landing.html?" + params.toString()
}

//Attempts to update the targeted note
const update = async (event) => {
    event.preventDefault()

    //Gets form input data
    let formData = new FormData(editNoteForm)

    //Prepares options for api call
    let requestOptions = {
        method: 'PUT',
        body: formData
    }

    //Attempts to call PUT api
    await fetch(`${apiUrl}/${id}`, requestOptions)
        .then(res => {
            if(!res.ok) {
                throw new Error('Network response was not OK')
            }
            return res.text()
        })
        .then(data => {
            //If successful, redirects to landing page
            console.log("Data", data)

            //Parameters for toast notification on landing page
            var params = new URLSearchParams()
            params.append("notif", "editSuccess")
            window.location.href = "../landing/landing.html?" + params.toString()
        })
        .catch(err => {
            //if unsuccessful, display an error notification
            console.error('Error:', err)

            
            //Display toast notification
            toastAlert.classList.add('text-bg-danger')
            toastText.innerHTML = '<strong>Error!</strong> Unable to update note.'
            const toast = new bootstrap.Toast(toastAlert)
            toast.show()
        })
}

//Attempt to delete targeted note
const deleteNote = async () => {

    //prepare options for api call
    let requestOptions = {
        method: 'DELETE',
    }

    //Attempts to call DELETE api
    await fetch(`${apiUrl}/${id}`, requestOptions)
        .then(res => {
            if(!res.ok) {
                throw new Error('Network response was not OK')
            }
            return res.text()
        })
        .then(data => {
            //If successful, redirects to landing page
            console.log("Data", data)
            
            //Parameters for toast notification on landing page
            var params = new URLSearchParams()
            params.append("notif", "editDelete")
            window.location.href = "../landing/landing.html?" + params.toString()
        })
        .catch(err => {
            //if unsuccessful, display an error notification
            console.error('Error:', err)

            //Display toast notification
            toastAlert.classList.add('text-bg-danger')
            toastText.innerHTML = '<strong>Error!</strong> Unable to delete note.'
            const toast = new bootstrap.Toast(toastAlert)
            toast.show()
        })
}

const logout = () => {
    console.log("not implemented")
}


//SECTION variables and constants
import config from '../config/config.js'

const apiUrl = config.server + config.api + config.notesRoute
let id = 0

const discardBtn = document.getElementById('discardBtn')
const logoutBtn = document.getElementById('logoutBtn')
const deleteBtn = document.getElementById('deleteBtn')

const titleEntry = document.getElementById('titleEntry')
const contentEntry = document.getElementById('contentEntry')
const editNoteForm = document.getElementById('editNoteForm')
const toastAlert = document.getElementById('toastAlert')
const toastText = document.getElementById('toastText')

//SECTION event listeners

discardBtn.addEventListener('click', discard)
logoutBtn.addEventListener('click', logout)
deleteBtn.addEventListener('click', deleteNote)
editNoteForm.addEventListener('submit', update)

//SECTION Page Load

load()