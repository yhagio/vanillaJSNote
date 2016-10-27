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
        self.view.displayNotes(self.model.getAllNotes());

        // var list = self.view.noteList.getElementsByTagName('li');
        // list[list.length - 1].addEventListener('click', function(e) {
        //   self.model.currentNoteId = parseInt(this.id, 10);
        //   self.view.displaySingleNote(self.model.getNote(self.model.currentNoteId));
        // });

        document.getElementById('inputTitle').value = '';
        document.getElementById('inputBody').value = '';
      }
    });

    // Display all notes
    self.view.displayNotes(self.model.getAllNotes());
    self.view.displaySingleNote(self.model.getNote(self.model.currentNoteId));

    // // Add click Eventlistener to each note item
    // var listItems = self.view.noteList.getElementsByTagName('li');
    // for(var i = 0; listItems.length > i; i++) {
    //   listItems[i].addEventListener('click', function(e) {
    //     self.model.currentNoteId = parseInt(this.id, 10);
    //     self.view.displaySingleNote(self.model.getNote(self.model.currentNoteId));
    //   });
    // }
  }

  // Controller.prototype.setCurrentNoteId = function(id) {
  //   this.model.currentNoteId = id;
  // };

  // Controller.prototype.getCurrentNoteId = function() {
  //   return this.model.currentNoteId;
  // }

  // Export to window
  window.app = app || {};
  window.app.Controller = Controller;

})(window);