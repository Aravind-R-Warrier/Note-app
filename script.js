const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");

// Show stored notes from localStorage
function showNotes() {
    notesContainer.innerHTML = localStorage.getItem('notes');
    // Bind keyup events for existing notes
    bindNoteEvents();
}

// Function to update localStorage with the current content of notes
let updateLocalStorage = () => {
    localStorage.setItem("notes", notesContainer.innerHTML);
}

// Function to bind keyup events to each note
function bindNoteEvents() {
    const notes = document.querySelectorAll(".input-box");
    notes.forEach(note => {
        note.addEventListener("keyup", updateLocalStorage);
    });
}

// Create a new note when the button is clicked
createBtn.addEventListener('click', () => {
    const inputBox = document.createElement('p');
    const img = document.createElement('img');
    
    inputBox.className = 'input-box';
    inputBox.setAttribute("contenteditable", "true");
    img.src = "images/delete.png";
    
    // Append the input box and delete icon to the container
    notesContainer.appendChild(inputBox).appendChild(img);
    
    // Bind the keyup event for the new note
    bindNoteEvents();
});

// Handle delete functionality
notesContainer.addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG') {
        // Remove the note element when the delete button is clicked
        e.target.parentElement.remove();
        updateLocalStorage();
    }
});

// Handle 'Enter' key to allow new lines inside contenteditable <p> tags
document.addEventListener("keydown", (e) => {
    if (e.key === 'Enter') {
        e.preventDefault(); // Prevent default Enter behavior
        document.execCommand('insertHTML', false, '<br>'); // Insert a new line
    }
});

// Initialize the app by loading stored notes
showNotes();
