/* IDs
  app
  author
  setNameForm
  authorName
  setName
  noteList
  addNewNote
  inputBody
  submitNote
*/



/*
function NoteModel() {
  this.name = '';
  this.lastId = 2;
  this.currentNoteId = 0;
  this.notes = [
    {
      id: 0,
      body: 'This is my first note!',
      date: '2016/10/10'
    },
    {
      id: 1,
      body: 'Learn Javascript as hard as I can!',
      date: '2016/10/15'
    },
    {
      id: 2,
      body: 'Be JS Ninja!',
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

NoteModel.prototype.addNote = function(body) {
  var newNoteObj = {
    id: this.lastId++,
    body: body,
    date: Date.now()
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
}; */

// Controller
/*
function Controller(model, view) {
  var self = this;
  self.model = model;
  self.view = view;

  // Add Eventlistener
  self.view.addNoteForm.addEventListener('submit', function(e) {
    e.preventDefault();
    if (!e.target.inputBody.value) {
      alert('NEED BODY');
    } else {
      self.model.addNote(e.target.inputBody.value);
      document.getElementById('inputBody').value = '';
      self.view.displayNotes(self.model.getAllNotes());
    }
  });

  // Display all notes
  self.view.displayNotes(self.model.getAllNotes());
}

Controller.prototype.handleAddNote = function(note) {

}
*/

// View
// function Template() {
//   this.template
//     = '<li class="pure-menu-item">' +
//         '<p class="">{body}</p>' +
//         '<p>{date}</p>' +
//       '</li>';
// }

// Template.prototype.displayNotes = function(notes) {
//   var view = '';
//   var self = this;
//   notes.forEach(function(note) {
//     var template = self.template;
//     template = template.replace('{body}', note.body);
//     template = template.replace('{date}', note.date);
//     view += template;
//   });
//   return view;
// }

// function View(template) {
//   var self = this;
//   this.template = template;

//   this.addNoteForm = document.getElementById('addNewNote');
// }

// View.prototype.displayNotes = function(notes) {
//   document.getElementById('noteList').innerHTML = this.template.displayNotes(notes);
// }

// window.app = app || {};
// window.app.NoteModel = NoteModel;
// window.app.Controller = Controller;
// window.app.Template = Template;
// window.app.View = View;

(function(){
  'use strict';
  function Note() {
    this.model = new app.NoteModel();
    this.template = new app.Template();
    this.view = new app.View(this.template, this.model);
    this.controller = new app.Controller(this.model, this.view);
  }

  var note = new Note();
})();



////////////////////////////////////////////////////////////////
/////////////// Object Oriented Approach ///////////////////////
////////////////////////////////////////////////////////////////

/* Requirement 
1. Model
- Note {
  id, body, updatedDate, complted
}

2. Controller
- Create note
- Remove note
- Update note
- Delete note
- Get all notes
- Get a note
- Filter notes

3. View
- Display notes
- Display a note

*/

/*
var model = {
  name: null,
  lastId: 2,
  currentNoteId: null,
  notes: [
    {
      id: 0,
      body: 'This is my first note!',
      date: '2016/10/10'
    },
    {
      id: 1,
      body: 'Learn Javascript as hard as I can!',
      date: '2016/10/15'
    },
    {
      id: 2,
      body: 'Be JS Ninja!',
      date: '2016/10/20'
    }
  ]
};

var controller = {
  init: function() {
    listView.init();
  },

  getAllNotes: function() {
    return model.notes.reverse();
  },

  getCurrentNote: function(id) {
    var item = model.notes.filter(function(obj) {
      return obj.id === id;
    });
    return item;
  },

  setCurrentNote: function(id) {
    model.currentNoteId = id
  },

  addNote: function(body) {
    debugger;
    var newNoteObj = {
      id: this.lastId++,
      body: body,
      date: Date.now()
    };
    model.notes.push(newNoteObj);
    // return model.notes;
    listView.render();
  },

  updateNote: function(id, newBody) {
    var theNote;
    model.notes.forEach(function(note) {
      if (note.id === id) {
        note = newBody;
        theNote= note;
        return;
      }
    });
    return theNote;
  },

  deleteNote: function(id) {
    var theIndex;
    model.notes.forEach(function(note, index) {
      if (note.id === id) {
        theIndex = index;
        return;
      }
    });

    if(theIndex >= 0) {
      model.notes.splice(theIndex, 1);
    }
    return model.notes;
  }
};

var listView = {
  init: function() {
    this.noteList = document.getElementById('noteList');
    this.render();
  },

  render: function() {
    var self = this;
    var view = '';
    self.template
      = '<li class="pure-menu-item">' +
          '<p class="">{body}</p>' +
          '<p>{date}</p>' +
        '</li>';
    controller.getAllNotes().forEach(function(note) {
      var template = self.template;
      template = template.replace('{body}', note.body);
      template = template.replace('{date}', note.date);
      view += template;
    });

    self.noteList.innerHTML = view;

    // Set Eventlistener for add note form
    document.getElementById('addNewNote').addEventListener('submit', function(e) {
      e.preventDefault();
      controller.addNote(e.target.inputBody.value);
      self.render();
    });
  }
};

var noteView = {

};

controller.init();
*/