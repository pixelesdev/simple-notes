const notesContainer = document.querySelector(".notes-container");
const createNote = document.querySelector("#create-note");

// Fetch notes from localStorage
function fetchNotes() {
    notesContainer.innerHTML = localStorage.getItem("notes") || "";

    // Attach event listeners to restored notes
    notesContainer.querySelectorAll(".note-wrapper").forEach(addNoteListeners);
}

// Save all notes
function save() {
    localStorage.setItem("notes", notesContainer.innerHTML);
}

// Attach listeners to a single note
function addNoteListeners(wrapper) {
    const note = wrapper.querySelector(".input-box");
    const deleteBtn = wrapper.querySelector(".delete-btn");

    // Delete functionality
    deleteBtn.addEventListener("click", () => {
        wrapper.remove();
        save();
    });

    // Save when typing
    note.addEventListener("keyup", save);
}

// Create a new note
createNote.addEventListener("click", () => {
    const wrapper = document.createElement("div");
    wrapper.className = "note-wrapper";

    const note = document.createElement("p");
    note.className = "input-box";
    note.setAttribute("contenteditable", "true");

    const deleteBtn = document.createElement("div");
    deleteBtn.className = "delete-btn";
    deleteBtn.innerHTML = `<img src="assets/delete.png" alt="delete">`;

    wrapper.appendChild(note);
    wrapper.appendChild(deleteBtn);
    notesContainer.appendChild(wrapper);

    addNoteListeners(wrapper);
    save();
});

// Handle Enter key for line breaks
document.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }
});

fetchNotes();
