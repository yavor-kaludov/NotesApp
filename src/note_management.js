// Holds all functions and data necessary to add, remove, show and hide notes
import { loadTemplateContent } from "./template_management.js";

let noteTemplateContent;

async function setupNotesManager() { // this function is used to initialize all other functionality in notes_management, inside of app.js

    // load all necessary templates: 

    noteTemplateContent = await loadTemplateContent("note_template");

    // init other functions
    setupAddNoteListener();
    showNotes(); // shows existing notes if any exist

}

// array to store user generated notes
let notesArray = [];

// Gets the user note from user input field and adds it to the notes array (handles data and touches UI)
// 
function addNoteToArray(note) {

    const noteInput = document.getElementById("note_input");
    const noteText = noteInput.value;

    if (noteText) {
        notesArray.push(noteText);
        console.log(notesArray);
        noteInput.value = "";
        showNotes();
        
    } else {
        console.error("No note entered!");
    }

}

// Gives functionality to "Add Note!" button by calling AddNoteToArray (handles event)
function setupAddNoteListener() {

    const add_note_button = document.getElementById("add_note_button");
    add_note_button.addEventListener("click", addNoteToArray);

}

async function showNotes() { // creates a note element from the note template text + detete button
    const notesList = document.getElementById("notes_list");
    const clearAllNotesButton = document.getElementById("clear_all_button");

    if (notesArray.length > 0) {
        notesList.className = "visible space-y-2 mt-10"
        clearAllNotesButton.className = "visible pt-10 text-center"
    } else {
        notesList.className = "hidden space-y-2 mt-10"
        clearAllNotesButton.className = "hidden pt-10 text-center"
    }

    notesList.innerHTML = "";

    if (!noteTemplateContent) {
        await loadNoteTemplateContent();
    }

    notesArray.forEach((note, index) => {
        const noteElement = document.importNode(noteTemplateContent, true);
        noteElement.querySelector("[data-note-text]").textContent = note;

        const noteDeleteButton = noteElement.querySelector("[data-note-delete-button]");
        noteDeleteButton.addEventListener("click", () => deleteNote(index));

        notesList.append(noteElement);
    });

    clearAllNotesButton.addEventListener("click", function() {
        deleteAllNotes();
    });
    
}

function deleteNote(index) {
    notesArray.splice(index, 1); // Remove the note at the specified index
    showNotes(); // Refresh the list to show the updated notes
}

function deleteAllNotes() { // deletes all notes in notesArray
    notesArray.length = 0;
    showNotes();
}

function handleKeydown(event) { // handles all keysdown events, just add more ifs to add more keys:)
    if (event.keyCode == 13) {
        event.preventDefault();
        addNoteToArray();
    }
}


export { setupNotesManager, notesArray, addNoteToArray, setupAddNoteListener, showNotes, deleteNote, handleKeydown };