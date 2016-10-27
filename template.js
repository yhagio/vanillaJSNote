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
          '<button class="pure-button button-warning">DELETE</button>' +
        '</div>';
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
  
  // Export to window
  window.app = app || {};
  window.app.Template = Template;
})(window);
