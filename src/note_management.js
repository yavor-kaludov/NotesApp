// Holds all functions and data necessary to add, remove, show and hide notes
import { loadTemplateContent } from "./template_management.js";

let noteTemplateContent;

async function loadNoteTemplateContent() {
    noteTemplateContent = await loadTemplateContent("note_template");
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

    // const theBody = document.querySelector("body");
    // theBody.append(noteTemplateContent);

    notesArray.forEach((note, index) => {
        const noteElement = document.importNode(noteTemplateContent, true);
        noteElement.querySelector("[data-note-text]").textContent = note;

        const noteDeleteButton = noteElement.querySelector("[data-note-delete-button]");
        noteDeleteButton.onclick = function() {deleteNote(index)};

        notesList.append(noteElement);
    });
    
}

// Shows an updated list of notes stored in the notesArray (handles data)
// function showNotes() {
//     const notesList = document.getElementById("notes_list");
//     notesList.innerHTML = ""; // Clear existing notes

//     notesArray.forEach((note, index) => {
//         const noteAndDeleteDiv = document.createElement("div");
//         // Apply both flexbox and container styles
//         noteAndDeleteDiv.className = "flex flex-row justify-between space-x-5 px-2 note-container"; // Use this single line to set classes

//         const singleNote = document.createElement("p");
        
//         // singleNote.className = "break-words overflow-auto"

//         // Temp FIX for broken margin styling using inline styling direcly with CSS not tailwind. (more specificity???)
//         singleNote.style.overflowWrap = 'break-word';
//         singleNote.style.wordBreak = 'break-all';
//         singleNote.style.marginRight = '10px';

//         const deleteNoteButton = document.createElement("button");

//         singleNote.textContent = note; // Set the text of the note
//         deleteNoteButton.textContent = "Delete"; // Set the text of the button
//         deleteNoteButton.onclick = function() { deleteNote(index); }; // Add click handler to delete the note

//         // Append elements to the note container div
//         noteAndDeleteDiv.appendChild(singleNote);
//         noteAndDeleteDiv.appendChild(deleteNoteButton);

//         // Append the div to the notes list
//         notesList.appendChild(noteAndDeleteDiv);
//     });
// }

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


document.addEventListener("DOMContentLoaded", function() {
    loadNoteTemplateContent().then(() => {
        setupAddNoteListener();
        showNotes(); // Initial display
    });
});

export { notesArray, addNoteToArray, setupAddNoteListener, showNotes, deleteNote, handleEnterKey };