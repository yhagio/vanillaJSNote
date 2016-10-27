(function(){
  'use strict'

  function NoteModel() {
    this.name = '';
    this.lastId = 3;
    this.currentNoteId = 0;
    this.notes = [
      {
        id: 0,
        title: 'JS Ninja',
        body: 'Create vanilla JS twitter!',
        date: '2016/10/10'
      },
      {
        id: 1,
        title: 'Become JS king',
        body: 'Learn Javascript as hard as I can!',
        date: '2016/10/15'
      },
      {
        id: 2,
        title: 'Machine learning',
        body: 'Learn Python for Machine Learning!',
        date: '2016/10/20'
      }
    ];
  }

  NoteModel.prototype.setName = function(name) {
    this.name = name;
  }

  NoteModel.prototype.getName = function() {
    return this.name;
  }

  NoteModel.prototype.getAllNotes = function() {
    return this.notes;
  };

  NoteModel.prototype.addNote = function(title, body) {
    var newNoteObj = {
      id: this.lastId++,
      title: title,
      body: body,
      date: prettyDate(Date.now())
    };
    this.notes.push(newNoteObj);
    return this.notes;
  };

  NoteModel.prototype.getNote = function(id) {
    var item = this.notes.filter(function(obj) {
      return obj.id === id;
    });
    return item;
  };

  NoteModel.prototype.editNote = function(id, newBody) {
    var theNote;
    this.notes.forEach(function(note) {
      if (note.id === id) {
        note = newBody;
        theNote= note;
        return;
      }
    });
    return theNote;
  };

  NoteModel.prototype.deleteNote = function(id) {
    var theIndex;
    this.notes.forEach(function(note, index) {
      if (note.id === id) {
        theIndex = index;
        return;
      }
    });

    if(theIndex >= 0) {
      this.notes.splice(theIndex, 1);
    }
    return this.notes;
  };
  
  // Export to window
  window.app = app || {};
  window.app.NoteModel = NoteModel;
})(window);