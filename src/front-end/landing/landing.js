//SECTION functions

//Populates the options in the dropdown menu
const setFilterOptions = (options) => {
    let htmlOptions = []

    options.forEach((element, index) => {
        htmlOptions.push(`<option value="${index}">${element[0]}</option>`)
    })

    dateFilter.innerHTML = htmlOptions.join('')
}

//Calculate a date n days in the past
const getPastDate = (days) => {
    let date = new Date();
    date.setDate(date.getDate() - days)
    return new Date(date)
}

//Update display when the date filter is changed
const dateFilterChanged = async () => {
    await displayNotes()
}

//Display a toast notification on page load if required
//Based on URl parameter 'notif'
const getToastNotif = () => {
    let notif = params.get("notif")
    let notifText

    //Determine how to render the notification 
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
    //Check if the notification should be rendered
    if(notif) {
        toastText.innerHTML = notifText
        const toast = new bootstrap.Toast(toastAlert)
        toast.show()
    }
}

//Attempts to call get API 
const retrieveNotes = async () => {

    let requestOptions = {
        method: 'GET',
        headers: {
            'authorization': 'Bearer ' + localStorage.getItem('accessToken')
        }
    }

    let response = await fetch(apiUrl, requestOptions)
    
    const data = await response.json()
    if(response.ok) {
        //If successful, returns a list of notes sent by the back end
        let notes = data
        return notes
    } else {
        //If unsuccessful, displays an error notification
        console.error("Error retrieving notes:", data.message)

        //Display toast notification
        toastAlert.classList.add('text-bg-danger')
        toastText.innerHTML = '<strong>Error!</strong> Unable to retrieve notes from database.'
        const toast = new bootstrap.Toast(toastAlert)
        toast.show()
    }
}

//Formats notes into html cards to display on page
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

    //Create html cards
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

const newNote = () => {
    location.href = "../add-note/add-note.html"
}

const editNote = (event) => {
    //Gets the id of the targeted note
    let id = event.target.parentElement.id

    //Pass id to url search params
    params = new URLSearchParams()
    params.append("id", id)
    //redirect to edit page passing search parameters
    location.href = '../modify-note/modify-note.html?' + params.toString()
}
//SECTION variables and constants
import config from '../config/config.js'

const apiUrl = config.server + config.api + config.notesRoute

let notes = []

//The options that populate the dropdown
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
const newNoteBtn = document.getElementById('newNoteBtn')
const toastAlert = document.getElementById('toastAlert')
const toastText = document.getElementById('toastText')

var params = new URLSearchParams(window.location.search)
const accessToken = localStorage.getItem('accessToken')
const refreshToken = localStorage.getItem('refreshToken')


//SECTION Page load
setFilterOptions(dateFilterOptions)

displayNotes()

getToastNotif()

//SECTION Event listeners
dateFilter.addEventListener("change", dateFilterChanged)
newNoteBtn.addEventListener("click", newNote)
noteContainer.addEventListener("click", function (event) {
    if(event.target.classList.contains('editBtn')) {
        editNote(event)
    }
})

