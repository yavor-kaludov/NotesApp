
import * as NoteManager from "./note_management.js"


// _____________________________________________________

document.addEventListener("DOMContentLoaded", function() {
    
    NoteManager.setupNotesManager();
    
    
});

document.addEventListener("DOMContentLoaded", function() {
    const noteInput = document.getElementById("note_input");
    noteInput.addEventListener('keydown', NoteManager.handleEnterKey);
});
