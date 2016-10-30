(function(){
  'use strict'

  function View(template) {
    var self = this;

    this.template = template;
    this.addNoteForm = document.getElementById('addNewNote');
    this.noteList = document.getElementById('noteList');
    this.currentNote = document.getElementById('currentNote');
    this.updateForm = null;
  }

  View.prototype.displayUpdateForm = function(note) {
    var updateForm = this.template.displayUpdateNoteForm(note);
    
    this.updateForm = document.getElementById('updateFormArea');
    this.updateForm.innerHTML = updateForm;
  }

  // Export to window
  window.app = app || {};
  window.app.View = View;
})(window);