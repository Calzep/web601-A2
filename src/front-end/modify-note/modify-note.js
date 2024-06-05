//SECTION functions

const loadNote = async () => {
    var params = new URLSearchParams(window.location.search)
    let id = params.get("id")

    try {
        let response = await fetch(`${apiUrl}/${id}`)
        if(!response.ok) {
            throw new Error('Network response was not OK')
        }

        let note = await response.json()
        console.log(note)
        titleEntry.value = note.title
        contentEntry.value = note.content
        noteId.value = note.id
        deleteNoteInput.value = 'false'

    } catch (err) {
        console.error("Error retrieving notes", err)//REVIEW include error notifs here
        return null
    }

    
}

const discard = () => {
    window.location.replace("../landing/landing.html")
}

const deleteNote = () => {
    deleteNoteInput.value = 'True'
    console.log("not fully implemented")
}

const logout = () => {
    console.log("not implemented")
}


//SECTION variables and constants
import config from '../config/config.js'

const apiUrl = config.server + config.api + config.notesRoute

const discardBtn = document.getElementById('discardBtn')
const logoutBtn = document.getElementById('logoutBtn')
const deleteBtn = document.getElementById('deleteBtn')

const titleEntry = document.getElementById('titleEntry')
const contentEntry = document.getElementById('contentEntry')
const noteId = document.getElementById('noteId')
const deleteNoteInput = document.getElementById('deleteNote')

//SECTION event listeners

discardBtn.addEventListener('click', discard)
logoutBtn.addEventListener('click', logout)
deleteBtn.addEventListener('click', deleteNote)

//SECTION Page Load

loadNote()