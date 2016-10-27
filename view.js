(function(){
  'use strict'

  function View(template, model) {
    var self = this;
    this.model = model;
    this.template = template;
    this.addNoteForm = document.getElementById('addNewNote');
    this.noteList = document.getElementById('noteList');
    this.currentNote = document.getElementById('currentNote');
  }

  View.prototype.displayNotes = function(notes) {
    var self = this;
    this.noteList.innerHTML = this.template.displayNotes(notes);

    // var listItems = this.noteList.getElementsByTagName('li');
    // for(var i = 0; listItems.length > i; i++) {
    //   listItems[i].addEventListener('click', function(e) {
    //     self.controller.setCurrentNoteId(parseInt(this.id, 10));
    //     self.view.displaySingleNote(self.controller.getNote(self.controller.getCurrentNoteId()));
    //   });
    // }

    // Add click Eventlistener to each note item
    var listItems = this.noteList.getElementsByTagName('li');
    for(var i = 0; listItems.length > i; i++) {
      listItems[i].addEventListener('click', function(e) {
        self.model.currentNoteId = parseInt(this.id, 10);
        self.displaySingleNote(self.model.getNote(self.model.currentNoteId));
      });
    }
  }

  View.prototype.displaySingleNote = function(note) {
    this.currentNote.innerHTML = this.template.displaySingleNote(note[0]);
  }
  
  // Export to window
  window.app = app || {};
  window.app.View = View;
})(window);