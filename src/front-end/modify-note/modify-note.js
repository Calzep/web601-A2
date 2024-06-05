//SECTION functions

const load = async () => {
    var params = new URLSearchParams(window.location.search)
    id = params.get("id")

    try {
        let response = await fetch(`${apiUrl}/${id}`)
        if(!response.ok) {
            throw new Error('Network response was not OK')
        }

        let note = await response.json()
        console.log(note)
        titleEntry.value = note.title
        contentEntry.value = note.content

    } catch (err) {
        console.error("Error retrieving notes", err)//REVIEW include error notifs here
        
        //Display toast notification
        toastAlert.classList.add('text-bg-danger')
        toastText.innerHTML = '<strong>Error!</strong> Unable to fetch note for editing.'
        const toast = new bootstrap.Toast(toastAlert)
        toast.show()
    }
}

const discard = () => {
    //Parameters for toast notifications
    var params = new URLSearchParams()
    params.append("notif", "editDiscard")
    window.location.href = "../landing/landing.html?" + params.toString()
}

const update = async (event) => {
    event.preventDefault()

    let formData = new FormData(editNoteForm)

    let requestOptions = {
        method: 'PUT',
        body: formData
    }

    await fetch(`${apiUrl}/${id}`, requestOptions)
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
            params.append("notif", "editSuccess")
            window.location.href = "../landing/landing.html?" + params.toString()
        })
        .catch(err => {
            console.error('Error:', err)

            
            //Display toast notification
            toastAlert.classList.add('text-bg-danger')
            toastText.innerHTML = '<strong>Error!</strong> Unable to update note.'
            const toast = new bootstrap.Toast(toastAlert)
            toast.show()
        })
}

const deleteNote = async () => {

    let requestOptions = {
        method: 'DELETE',
    }

    await fetch(`${apiUrl}/${id}`, requestOptions)
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
            params.append("notif", "editDelete")
            window.location.href = "../landing/landing.html?" + params.toString()
        })
        .catch(err => {
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