// Holds all functions and data necessary to add, remove, show and hide notes
import { loadTemplateContent } from "./template_management.js";

let noteTemplateContent;



async function setupNotesManager() { // this function is used to initialize all other functionality in notes_management, inside of app.js

    // load all necessary templates: 
    noteTemplateContent = await loadTemplateContent("note_template");

    // init other functions
    setupAddNoteListener();
    showNotes(); // show existing notes if any


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
        console.log("No note entered!");
    }

}

// Gives functionality to "Add Note!" button by calling AddNoteToArray (handles event)
function setupAddNoteListener() {

    const add_note_button = document.getElementById("add_note_button");
    add_note_button.addEventListener("click", addNoteToArray);

}

async function showNotes() {
    const notesList = document.getElementById("notes_list");
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
    
}

function deleteNote(index) {
    notesArray.splice(index, 1); // Remove the note at the specified index
    showNotes(); // Refresh the list to show the updated notes
}

function handleEnterKey(event) {
    if (event.keyCode == 13) {
        event.preventDefault();
        addNoteToArray();
    }
}


export { setupNotesManager, notesArray, addNoteToArray, setupAddNoteListener, showNotes, deleteNote, handleEnterKey };