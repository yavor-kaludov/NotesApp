
function sayHello() {
    console.log("Hello World!");
}

function startup() {
    const button = document.getElementById("start_button");
    button.addEventListener("click", sayHello);
}

// ____________________________________________________________

let notesArray = [];

function addNoteToArray(note) {
    const noteInput = document.getElementById("note_input");
    
    const noteText = noteInput.value;

    if (noteText) {
        notesArray.push(noteText);
        console.log(notesArray);
        noteInput.value = "";
        showNotes();
        updateClearButtonVisibility();
    } else {
        console.log("No note entered!");
    }

}


function storeNoteInNotesArray() {

    const add_note_button = document.getElementById("add_note_button");
    add_note_button.addEventListener("click", addNoteToArray);

}

function showNotes() {
    const notesList = document.getElementById("notes_list");
    notesList.innerHTML = "";

    for (const note of notesArray) {
        const singleNote = document.createElement("p");
        singleNote.textContent = note;
        notesList.append(singleNote)
    }
}

function setUpClearButton() {
    const mainComponent = document.getElementById("main_component")
    const clearButton = document.createElement("button")
    clearButton.textContent = "Clear All";
    clearButton.id = "clear_all_button"
    clearButton.className = "hidden"

    clearButton.addEventListener("click", function() {
        notesArray = [];
        showNotes();
        updateClearButtonVisibility();
    })

    mainComponent.append(clearButton);
}

function updateClearButtonVisibility() {
    const clearButton = document.getElementById("clear_all_button");
    
    if (notesArray.length > 0) {
        clearButton.classList.remove("hidden");
    } else {
        clearButton.classList.add("hidden");
    }
}

// _____________________________________________________

document.addEventListener("DOMContentLoaded", function() {
    startup();
    storeNoteInNotesArray();
    setUpClearButton();
});