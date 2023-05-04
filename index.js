const addTitle = document.getElementById('addTitle');
const addText = document.getElementById('addText');
const addNoteButton = document.getElementById('addNote');
const notesDiv = document.getElementById('notes');
const showDeletedNotesButton = document.getElementById('showDeletedNotes');
const showArchviedNotesButton = document.getElementById('showArchivedNotes');
showDeletedNotesButton.addEventListener('click', showDeletedNotes);
showArchviedNotesButton.addEventListener('click', showArchivedNotes);

showNotes();
function addNotes(){
    let notes=localStorage.getItem('notes');
    if(notes === null){
        notes = [];
    }
    else{
        notes = JSON.parse(notes);
    }

    if(addText.value == ''){
        alert('Add your note');
        return;
    }
    
   const noteObj = {
    title:addTitle.value,
    text:addText.value,
   }
   addTitle.value='';
   addText.value='';
   notes.push(noteObj);
   localStorage.setItem('notes',JSON.stringify(notes));
   showNotes();
}
function showNotes(){
    let notesHTML= '';
    let notes=localStorage.getItem('notes');
    if(notes === null){
        return;
    }
    else{
        notes = JSON.parse(notes);
    }
    for(let i=0;i<notes.length;i++){
        console.log(notes[i]);
         notesHTML += ` <div class="note">
                        <button class="deleteNote" id=${i} onclick="deleteNote(${i})">Delete</button>
                        <button class="archiveNote" id="${i}" onclick="archiveNote(${i})">Archive</button>
                        <button class="editNote" id="${i}" onclick="editNote(${i})">Edit</button>
                        <div class="title">${notes[i].title === "" ? 'Note' : notes[i].title  }</div>
                        <div class="text">${notes[i].text}</div>
                      </div>
         `
    }

    notesDiv.innerHTML = notesHTML;
}
function deleteNote(ind){
    let notes = localStorage.getItem('notes');
    if (notes === null) {
      return;
    } else {
      notes = JSON.parse(notes);
    }
    let deletedNote = notes.splice(ind, 1)[0];
    let deletedNotes = localStorage.getItem('deletedNotes');
    if (deletedNotes === null) {
      deletedNotes = [];
    } else {
      deletedNotes = JSON.parse(deletedNotes);
    }
    deletedNotes.push(deletedNote);
    localStorage.setItem('notes', JSON.stringify(notes));
    localStorage.setItem('deletedNotes', JSON.stringify(deletedNotes));
    showNotes();
}
function showDeletedNotes() {
    let deletedNotesHTML = '';
    let deletedNotes = localStorage.getItem('deletedNotes');
    if (deletedNotes === null) {
      return;
    } else {
      deletedNotes = JSON.parse(deletedNotes);
    }
    for (let i = 0; i < deletedNotes.length; i++) {
      deletedNotesHTML += ` <div class="note deleted-note">
                              <p>Deleted notes<p>
                              <div class="title">${deletedNotes[i].title === "" ? 'Note' : deletedNotes[i].title}</div>
                              <div class="text">${deletedNotes[i].text}</div>
                            </div>
                           `
    }
    notesDiv.innerHTML = deletedNotesHTML;
  }
  function archiveNote(ind){
    let notes = localStorage.getItem('notes');
    if (notes === null) {
      return;
    } else {
      notes = JSON.parse(notes);
    }
    let archivedNote = notes.splice(ind, 1)[0];
    let archivedNotes = localStorage.getItem('archivedNotes');
    if (archivedNotes === null) {
      archivedNotes = [];
    } else {
      archivedNotes = JSON.parse(archivedNotes);
    }
    archivedNotes.push(archivedNote);
    localStorage.setItem('notes', JSON.stringify(notes));
    localStorage.setItem('archivedNotes', JSON.stringify(archivedNotes));
    showNotes();
}
function showArchivedNotes() {
  let archivedNotesHTML = '';
  let archivedNotes = localStorage.getItem('archivedNotes');
  if (archivedNotes === null) {
    return;
  } else {
    archivedNotes = JSON.parse(archivedNotes);
  }
  for (let i = 0; i < archivedNotes.length; i++) {
    archivedNotesHTML += ` <div class="note archived-note">
                            <p>Archived notes<p>
                            <div class="title">${archivedNotes[i].title === "" ? 'Note' : archivedNotes[i].title}</div>
                            <div class="text">${archivedNotes[i].text}</div>
                          </div>
                         `
  }
  notesDiv.innerHTML = archivedNotesHTML;
  
}
function editNote (ind){
  let notes = localStorage.getItem('notes');
  if (notes === null) {
    return;
  } else {
    notes = JSON.parse(notes);
  }
  const noteObj = notes[ind];
  addTitle.value = noteObj.title;
  addText.value = noteObj.text;
  deleteNote(ind);
}

  
addNoteButton.addEventListener('click',addNotes)