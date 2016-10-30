(function(){
  'use strict';

  function Controller(model, view) {
    var self = this;
    self.model = model;
    self.view = view;

    // Display all notes
    self.setEventListenerToNoteForm();
    self.displayNotes(self.model.getAllNotes());
    self.displaySingleNote(self.model.getNote(self.model.currentNoteId));
  }

  // View related methods
  Controller.prototype.getAllNotes = function() {
    return this.model.getAllNotes();
  };

  Controller.prototype.getSingleNote = function(selectedId) {
    return this.model.getNote(selectedId);
  };

  Controller.prototype.setCurrentNoteId = function(selectedId) {
    this.model.currentNoteId = selectedId;
  };

  Controller.prototype.getFirstNote = function() {
    return this.model.getFirstNote();
  }

  Controller.prototype.deleteNote = function(id) {
    this.model.deleteNote(id);
  }

  // Update an existing note
  Controller.prototype.showUpdateNoteForm = function(id) {
    var note = this.getSingleNote(id);
    // display edit form
    var self = this;
    self.view.displayUpdateForm(note[0]);
    // add event listner to hook up method from model .updateNote()
    self.view.updateForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var newNote = {};
      if (!e.target.updateTitle.value || !e.target.updateBody.value) {
        alert('Missing inputs!');
      } else {
        newNote.title = e.target.updateTitle.value;
        newNote.body = e.target.updateBody.value;

        self.model.updateNote(e.target.noteId.value, newNote);
        self.displayNotes(self.model.getAllNotes());

        var currentNote = self.getSingleNote(parseInt(e.target.noteId.value, 10));
        self.displaySingleNote(currentNote || self.getFirstNote());
        self.view.updateForm.innerHTML = '';
      }
    })
  };

  // Create a new note
  Controller.prototype.setEventListenerToNoteForm = function() {
    // Add Eventlistener to form
    var self = this;

    self.view.addNoteForm.addEventListener('submit', function(e) {
      e.preventDefault();
      if (!e.target.inputTitle.value || !e.target.inputBody.value) {
        alert('Missing input');
      } else {
        self.model.addNote(e.target.inputTitle.value, e.target.inputBody.value);
        self.displayNotes(self.model.getAllNotes());

        self.displaySingleNote(self.getSingleNote(self.model.currentNoteId) || self.getFirstNote())
        document.getElementById('inputTitle').value = '';
        document.getElementById('inputBody').value = '';
      }
    });
  }

  Controller.prototype.displayNotes = function(notes) {
    var self = this;
    // Display the note list in the DOM
    self.view.noteList.innerHTML = self.view.template.displayNotes(notes);

    // Add click Eventlistener to each note item
    // Clicking a note will set currently selected note id
    // display it
    var listItems = self.view.noteList.getElementsByTagName('li');
    for(var i = 0; listItems.length > i; i++) {
      listItems[i].addEventListener('click', function(e) {
        self.setCurrentNoteId(parseInt(this.id, 10));
        var clickedNote = self.getSingleNote(parseInt(this.id, 10));
        self.displaySingleNote(clickedNote || self.getFirstNote());
      });
    }
  }

  Controller.prototype.displaySingleNote = function(note) {
    var self = this;
    var noteToDisplay = note[0] || self.getFirstNote();

    if (noteToDisplay.id === undefined) {
      self.view.currentNote.innerHTML = '';
      return;
    }
    self.view.currentNote.innerHTML
       = self.view.template.displaySingleNote(noteToDisplay);

    // Display update form
    self.view.currentNote.getElementsByTagName('button')[0]
      .addEventListener('click', function(e) {
        self.showUpdateNoteForm(self.model.currentNoteId);
      });

    // Delete note Eventlistener
    // Clicking a note's delete button will delete the note
    // and re-render notes and the single note as well
    self.view.currentNote.getElementsByTagName('button')[1]
      .addEventListener('click', function(e) {
        self.deleteNote(self.model.currentNoteId);
        self.displayNotes(self.getAllNotes());

        // displayy the first note in the list
        self.displaySingleNote(self.getFirstNote());
        
        // set currentNoteId to the first note in the list
        self.model.currentNoteId = self.getFirstNote().id;
      });
  }

  // Export to window
  window.app = app || {};
  window.app.Controller = Controller;

})(window);