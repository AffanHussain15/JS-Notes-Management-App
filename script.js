window.onload = function () {
  loadNotes();

  var addNoteButton = document.getElementById("add-note");
  addNoteButton.onclick = function () {
    var title = document.getElementById("note-title").value.trim();
    var description = document.getElementById("note-description").value.trim();

    if (title === "" || description === "") {
      alert("Please enter both title and description!");
      return;
    }

    var note = { title: title, description: description };

    saveNoteToStorage(note);
    displayNote(note);

    document.getElementById("note-title").value = "";
    document.getElementById("note-description").value = "";
  };
};

function loadNotes() {
  var notes = getNotesFromStorage();
  for (var i = 0; i < notes.length; i++) {
    displayNote(notes[i]);
  }
}

function displayNote(note) {
  var notesContainer = document.getElementById("notes-container");

  var noteCard = document.createElement("div");
  noteCard.className = "note-card";

  var noteTitle = document.createElement("h3");
  noteTitle.textContent = note.title;

  var noteDescription = document.createElement("p");
  noteDescription.textContent = note.description;

  var deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.onclick = function () {
    deleteNote(note);
  };

  noteCard.appendChild(noteTitle);
  noteCard.appendChild(noteDescription);
  noteCard.appendChild(deleteButton);
  notesContainer.appendChild(noteCard);
}

function saveNoteToStorage(note) {
  var notes = getNotesFromStorage();
  notes.push(note);
  localStorage.setItem("notes", JSON.stringify(notes));
}

function getNotesFromStorage() {
  var notes = localStorage.getItem("notes");
  if (notes) {
    return JSON.parse(notes);
  } else {
    return [];
  }
}

function deleteNote(noteToDelete) {
  var notes = getNotesFromStorage();
  var updatedNotes = [];

  for (var i = 0; i < notes.length; i++) {
    var note = notes[i];
    if (
      note.title !== noteToDelete.title ||
      note.description !== noteToDelete.description
    ) {
      updatedNotes.push(note);
    }
  }

  localStorage.setItem("notes", JSON.stringify(updatedNotes));
  document.getElementById("notes-container").innerHTML = "";
  loadNotes();
}
