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

const dateFilterChanged = () => {
    displayNotes(notes)
}

const retrieveNotes = () => {
    return noteTestData.slice()
}

const displayNotes = (notes) => {

    //Order list by date
    notes.sort(function(x, y) {
        return y.date - x.date
    })
    
    let noteCards = []

    notes.forEach(note => {
        if(note.date.toISOString() > dateFilterOptions[dateFilter.value][1].toISOString()){
            noteCards.push(`<div id="${note.id}" class="note">
            <h3>${note.title}</h3>
            <p class="dull date">${note.date.toLocaleDateString()}</p>
            <hr>
            <p class="default">${note.body}</p>
            <a href=""><p>edit note</p></a>
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

//SECTION variables and constants
let noteTestData =  [
    {
        id: 1,
        userId: 1,
        title: "Test Note Title",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur aliquam magna feugiat venenatis pharetra. Nunc nisi elit, varius eget bibendum et, laoreet dictum nunc. Mauris bibendum, lacus sed vulputate laoreet, est nulla vulputate quam, a ultrices sem est et libero. Sed a viverra lectus. Vestibulum volutpat vestibulum felis vitae iaculis. Nulla elit mi, ultricies quis est et, aliquam elementum odio. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc venenatis sagittis dui sed posuere. Fusce vitae neque mauris.",
        date: new Date('2024-05-25T02:41:30.546Z')
    },
    {
        id: 2,
        userId: 1,
        title: "Remember to do something",
        body: "",
        date: new Date('2023-05-25T02:41:30.546Z')
    },
    {
        id: 3,
        userId: 1,
        title: "Note note note note",
        body: "Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note Note note note note ",
        date: new Date('2024-05-21T02:41:30.546Z')
    },
    {
        id: 4,
        userId: 1,
        title: "Chords",
        body: "Ab Bb Db Eb F",
        date: new Date('2024-05-01T02:41:30.546Z')
    }
]

let notes = retrieveNotes()

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

//SECTION Page load

setFilterOptions(dateFilterOptions)

displayNotes(notes)


//SECTION Event listeners
dateFilter.addEventListener("change", dateFilterChanged)
logoutBtn.addEventListener("click", logout)
newNoteBtn.addEventListener("click", newNote)

