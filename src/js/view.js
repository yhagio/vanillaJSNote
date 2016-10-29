(function(){
  'use strict'

  function View(template /*, model */) {
    var self = this;

    this.template = template;
    this.addNoteForm = document.getElementById('addNewNote');
    this.noteList = document.getElementById('noteList');
    this.currentNote = document.getElementById('currentNote');
  }

  // Export to window
  window.app = app || {};
  window.app.View = View;
})(window);