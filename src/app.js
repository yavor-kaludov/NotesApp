
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
    notesList.innerHTML = ""; // Clear existing notes

    notesArray.forEach((note, index) => {
        const noteAndDeleteDiv = document.createElement("div");
        // Apply both flexbox and container styles
        noteAndDeleteDiv.className = "flex flex-row justify-between  p-2 note-container"; // Use this single line to set classes

        const singleNote = document.createElement("p");
        const deleteNoteButton = document.createElement("button");

        singleNote.textContent = note; // Set the text of the note
        deleteNoteButton.textContent = "Delete"; // Set the text of the button
        deleteNoteButton.onclick = function() { deleteNote(index); }; // Add click handler to delete the note

        // Append elements to the note container div
        noteAndDeleteDiv.appendChild(singleNote);
        noteAndDeleteDiv.appendChild(deleteNoteButton);

        // Append the div to the notes list
        notesList.appendChild(noteAndDeleteDiv);
    });
}

function deleteNote(index) {
    notesArray.splice(index, 1); // Remove the note at the specified index
    showNotes(); // Refresh the list to show the updated notes
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

function handleEnterKey(event) {
    if (event.keyCode == 13) {
        event.preventDefault();
        addNoteToArray();
    }
}

// _____________________________________________________

document.addEventListener("DOMContentLoaded", function() {
    startup();
    storeNoteInNotesArray();
    setUpClearButton();
});

document.addEventListener("DOMContentLoaded", function() {
    const noteInput = document.getElementById("note_input");
    noteInput.addEventListener('keydown', handleEnterKey);
});
