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

        document.getElementById('inputTitle').value = '';
        document.getElementById('inputBody').value = '';
      }
    });

    // Display all notes
    self.view.displayNotes(self.model.getAllNotes());
    self.view.displaySingleNote(self.model.getNote(self.model.currentNoteId));
  }

  // Export to window
  window.app = app || {};
  window.app.Controller = Controller;

})(window);