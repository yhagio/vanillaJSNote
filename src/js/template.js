(function(){
  'use strict'

  function Template() {
    this.listTemplate
      = '<li id="{id}" class="pure-menu-item listItem">' +
          '<p class="">{title}</p>' +
          '<p>{date}</p>' +
        '</li>';

    this.singleNoteTemplate
      = '<div id="{id}" class="">' +
          '<h3>{title}</h3>' +
          '<p class="">{body}</p>' +
          '<p>{date}</p>' +
          '<button class="pure-button button-sub button-warning btn-right-space">EDIT</button>' +
          '<button class="pure-button button-sub button-error">DELETE</button>' +
        '</div>' +
        '<div id="updateFormArea"></div>';

    this.updateNoteForm
      = '<form id="updateNote" action="#" class="pure-form">' +
          '<h1>Edit Note</h1>' +
          '<fieldset>' +
            '<input type="hidden" name="noteId" value={noteId}>' +
            '<input type="text" id="updateTitle" name="updateTitle" class="inputArea" placeholder="Title..." value="{title}" autofocus>' +
            '<textarea type="text" id="updateBody" name="updateBody" class="inputArea" placeholder="Note...">{body}</textarea>' +
            '<br />' +
            '<button type="submit" id="updateNote" class="pure-button pure-button-primary addButton">Update</button>' +
          '</fieldset>' +
        '</form>';
  }

  Template.prototype.displayNotes = function(notes) {
    var view = '';
    var self = this;

    notes.forEach(function(note, i) {
      var listTemplate = self.listTemplate;
      listTemplate = listTemplate.replace('{id}', note.id);
      listTemplate = listTemplate.replace('{title}', note.title);
      listTemplate = listTemplate.replace('{date}', note.date);
      view += listTemplate;
    });
    return view;
  }

  Template.prototype.displaySingleNote = function(note) {
    var view = '';
    var singleNote = this.singleNoteTemplate; 

    singleNote = singleNote.replace('{id}', note.id);
    singleNote = singleNote.replace('{title}', note.title);
    singleNote = singleNote.replace('{body}', note.body);
    singleNote = singleNote.replace('{date}', note.date);

    view += singleNote;

    return view;
  }

  Template.prototype.displayUpdateNoteForm = function(note) {
    var view = '';
    var updateForm = this.updateNoteForm; 

    updateForm = updateForm.replace('{noteId}', note.id);
    updateForm = updateForm.replace('{title}', note.title);
    updateForm = updateForm.replace('{body}', note.body);

    view += updateForm;

    return view;
  }
  
  // Export to window
  window.app = app || {};
  window.app.Template = Template;
})(window);
