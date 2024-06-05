//SECTION functions

const setFilterOptions = (options) => {
    let htmlOptions = []

    options.forEach((element, index) => {
        htmlOptions.push(`<option value="${index}">${element[0]}</option>`)
    })

    dateFilter.innerHTML = htmlOptions.join('')
}

const getPastDate = (days) => {
    let date = new Date();
    date.setDate(date.getDate() - days)
    return new Date(date)
}

const dateFilterChanged = async () => {
    await displayNotes()
}

const getToastNotif = () => {
    var params = new URLSearchParams(window.location.search)
    let notif = params.get("notif")
    let notifText

    if(notif == 'createSuccess') {
        toastAlert.classList.add('text-bg-success')
        notifText = '<strong>Success!</strong> Successfully created new note.'
    }
    if(notif == 'createDiscard') {
        toastAlert.classList.add('text-bg-secondary')
        notifText = 'Note discarded'
    }
    if(notif == 'editSuccess') {
        toastAlert.classList.add('text-bg-success')
        notifText = '<strong>Success!</strong> Your note has been updated.'
    }
    if(notif == 'editDiscard') {
        toastAlert.classList.add('text-bg-secondary')
        notifText = 'Changes have been discarded'
    }
    if(notif == 'editDelete') {
        toastAlert.classList.add('text-bg-success')
        notifText = '<strong>Success!</strong> Your note has been deleted.'
    }
    if(notif) {
        toastText.innerHTML = notifText
        const toast = new bootstrap.Toast(toastAlert)
        toast.show()
    }
}

const retrieveNotes = async () => {
    try {
        let response = await fetch(apiUrl)
        if(!response.ok) {
            throw new Error('Network response was not OK')
        }

        let notes = await response.json()
        return notes
    } catch (err) {
        console.error("Error retrieving notes", err)

        //Display toast notification
        toastAlert.classList.add('text-bg-danger')
        toastText.innerHTML = '<strong>Error!</strong> Unable to retrieve notes from database.'
        const toast = new bootstrap.Toast(toastAlert)
        toast.show()
    }
}

const displayNotes = async () => {
    let notes = await retrieveNotes()

    //Convert date strings into date objects
    notes.forEach(note => {
        note.date = new Date(note.date)
    })

    //Order list by date
    notes.sort(function(x, y) {
        console.log(x.date, y.date)
        return y.date - x.date
    })

    let noteCards = []

    notes.forEach(note => {
        if(note.date.toISOString() > dateFilterOptions[dateFilter.value][1].toISOString()){
            noteCards.push(`<div id="${note._id}" class="note">
            <h3>${note.title}</h3>
            <p class="dull date">${note.date.toLocaleDateString()}</p>
            <hr>
            <p class="default">${note.content}</p>
            <button class="editBtn">edit note</button>
        </div>`)
        }
    })

    noteContainer.innerHTML = noteCards.join('')
}

const logout = () => {
    console.log("Not implemented")
}

const newNote = () => {
    window.location.replace("../add-note/add-note.html")
}

const editNote = (event) => {
    let id = event.target.parentElement.id

    //Pass id to url search params
    var params = new URLSearchParams()
    params.append("id", id)

    //redirect to edit page passing search parameters
    location.href = '../modify-note/modify-note.html?' + params.toString()
}
//SECTION variables and constants
import config from '../config/config.js'

const apiUrl = config.server + config.api + config.notesRoute

let notes = []

const dateFilterOptions = [
    ['All time', new Date('1901-12-13T00:00:00.000Z')],
    ['last 3 days', getPastDate(3)],
    ['last week', getPastDate(7)],
    ['last month', getPastDate(31)],
    ['last 6 months', getPastDate(183)],
    ['last year', getPastDate(365)]
]


const noteContainer = document.getElementById('noteContainer')
const dateFilter = document.getElementById('dateFilter')
const logoutBtn = document.getElementById('logoutBtn')
const newNoteBtn = document.getElementById('newNoteBtn')
const toastAlert = document.getElementById('toastAlert')
const toastText = document.getElementById('toastText')

//SECTION Page load
setFilterOptions(dateFilterOptions)

displayNotes()

getToastNotif()

//SECTION Event listeners
dateFilter.addEventListener("change", dateFilterChanged)
logoutBtn.addEventListener("click", logout)
newNoteBtn.addEventListener("click", newNote)
noteContainer.addEventListener("click", function (event) {
    if(event.target.classList.contains('editBtn')) {
        editNote(event)
    }
})

