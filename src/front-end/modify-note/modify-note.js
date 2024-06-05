//SECTION functions

const loadNote = (note) => {
    titleEntry.value = note.title
    contentEntry.value = note.content
    noteId.value = note.id
    deleteNoteInput.value = 'false'
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
let testNote = {
    id: 1,
    userId: 1,
    title: "test note",
    content: "note text note text Spelling misatke note text note text note text",
    date: new Date('2024-05-25T02:41:30.546Z')
}

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

loadNote(testNote)