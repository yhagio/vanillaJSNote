(function(){
  'use strict';

  function Controller(model, view) {
    var self = this;
    self.model = model;
    self.view = view;

    // Add Eventlistener to form
    self.view.addNoteForm.addEventListener('submit', function(e) {
      e.preventDefault();
      if (!e.target.inputTitle.value || !e.target.inputBody.value) {
        alert('Missing input');
      } else {
        self.model.addNote(e.target.inputTitle.value, e.target.inputBody.value);
        self.displayNotes(self.model.getAllNotes());

        document.getElementById('inputTitle').value = '';
        document.getElementById('inputBody').value = '';
      }
    });

    // Display all notes
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
    console.log('note', note);
    var self = this;
    self.view.currentNote.innerHTML
       = self.view.template.displaySingleNote(note[0] || self.getFirstNote());

    // Delete note Eventlistener
    // Clicking a note's delete button will delete the note
    // and re-render notes and the single note as well
    self.view.currentNote.getElementsByTagName('button')[0]
      .addEventListener('click', function(e) {

        self.deleteNote(self.model.currentNoteId);
        self.displayNotes(self.getAllNotes());
        self.displaySingleNote(self.getFirstNote());
      });
  }

  // Export to window
  window.app = app || {};
  window.app.Controller = Controller;

})(window);