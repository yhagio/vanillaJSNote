(function(){
  'use strict';
  function Note() {
    this.model = new app.NoteModel();
    this.template = new app.Template();
    this.view = new app.View(this.template);
    this.controller = new app.Controller(this.model, this.view);
  }

  var note = new Note();
})();
