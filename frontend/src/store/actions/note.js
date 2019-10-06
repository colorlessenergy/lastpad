import * as actionTypes from './actionTypes';
const config = require('../../config/config');



export const GetAllUserNotesAction = () => {
  return (dispatch, getState) => {
    // fetch the home page to check if they are online
    // if they are do the regular
    // otherwise use localstorage

    function offlineMode () {
      if (localStorage && localStorage.notes) {
        dispatch({ type: actionTypes.RETRIEVE_NOTES_SUCCESS, notes: JSON.parse(localStorage.notes) });
      }
    }

    if (navigator.onLine) {
      fetch(config.BACKEND_URL + '/note', {
        credentials: 'include'
      })
      .then(response => {
        return response.json();
      })
      .then((notes) => {
        // store notes into localstorage
        // to use when the user is offline
        localStorage.setItem('notes', JSON.stringify(notes));

        dispatch({ type: actionTypes.RETRIEVE_NOTES_SUCCESS, notes });
      })
      .catch(function (error) {
        // pass the notes from localstorage into redux
        // if they are on a local network
        offlineMode();
      });

    } else {
      // no internet connection
      offlineMode();
    }
  };
};

export const getUserNoteAction = (noteId, history) => {
  return (dispatch, getState) => {

    // get all notes from localstorage when offline

    function offlineMode () {
      if (localStorage && localStorage.notes) {
        let notes = JSON.parse(localStorage.notes);

        let requestedNote = notes.find((noteObj) => {
          return noteObj._id == noteId;
        });

        dispatch({ type: actionTypes.RETRIEVE_SINGLE_NOTE_SUCCESS, note: requestedNote });
      }
    }

    if (navigator.onLine) {
      fetch(config.BACKEND_URL + '/note/' + noteId, {
        credentials: 'include'
      })
        .then(response => {
          return response.json()
        })
        .then(note => {
          dispatch({ type: actionTypes.RETRIEVE_SINGLE_NOTE_SUCCESS, note });
        })
        .catch(err => {
          offlineMode();
        });
    } else {
      offlineMode();
    }
  };
};

export const createNoteAction = (note, history) => {
  return (dispatch, getState) => {

    // when the internet is not connected execute this function
    // to create a note offline in localstorage
    function offlineMode () {
      if (localStorage && localStorage.notes) {
        let parsedNotes = JSON.parse(localStorage.getItem('notes'));
        note._id = Math.floor(Math.random() * 100);

        if (localStorage.createNotes === undefined) {
          localStorage.setItem('createdNotes', JSON.stringify([note]));
        } else {
          let createdNotes = JSON.parse(localStorage.createNotes);
          createdNotes.push(note);
          localStorage.setItem('createdNotes', JSON.stringify(createdNotes));
        }


        parsedNotes.push(note);
        localStorage.setItem('notes', JSON.stringify(parsedNotes));

        history.push('/note/' + note._id);
      }
    }

    if (navigator.onLine) {
      fetch(config.BACKEND_URL + '/note', {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(note)
      })
      .then(response => {
        return response.json()
      })
      .then(note => {
        if (history !== false) {
          history.push('/note/' + note._id);
        }
        dispatch({ type: actionTypes.CREATE_NOTE_SUCCESS, note })
      })
      .catch(err => {
        offlineMode();
      });
    } else {
      offlineMode();
    }

  };
};

export const deleteUserNoteAction = (noteId) => {
  return (dispatch, getState) => {

    function offlineMode() {
      if (localStorage && localStorage.notes) {
        let localStorageParsedNotes = JSON.parse(localStorage.getItem('notes'));

        // remove the note from the localstorage notes because it is deleted
        let noteToBeDeleted = localStorageParsedNotes.find((note, index) => {
          if (noteId == note._id) {
            localStorageParsedNotes.splice(index, 1);
          }
          return noteId == note._id;
        });

        // when creating and deleting a note offline
        // we need to remove it from the createdNotes array

        let noteCreatedAndDeletedOffline = false;

        if (localStorage.createdNotes) {
          let parsedCreatedNotes = JSON.parse(localStorage.createdNotes);

          for (let i = 0; i < parsedCreatedNotes.length; i++) {
            if (parsedCreatedNotes[i]._id == noteToBeDeleted._id) {
              noteCreatedAndDeletedOffline = true;
              parsedCreatedNotes.splice(i, 1);
              break;
            }
          }

          if (parsedCreatedNotes.length === 0) {
            localStorage.removeItem('createdNotes');
          } else {
            localStorage.setItem('createdNotes', JSON.stringify(parsedCreatedNotes))
          }
        }

        localStorage.setItem('notes', JSON.stringify(localStorageParsedNotes));
        dispatch(GetAllUserNotesAction());

        // check to see if there is already a local deletedNotes array

        if (!noteCreatedAndDeletedOffline) {
          if (localStorage.deletedNotes === undefined) {
            localStorage.setItem('deletedNotes', JSON.stringify([noteToBeDeleted]));
          }
          else {
            let deletedNotes = JSON.parse(localStorage.deletedNotes);
            deletedNotes.push(noteToBeDeleted);
            localStorage.setItem('deletedNotes', JSON.stringify(deletedNotes));
          }
        }

      }
    };

    if (navigator.onLine) {
      fetch(config.BACKEND_URL + '/note/' + noteId, {
        credentials: 'include',
        method: 'DELETE'
      })
      .then(res => {
        return res.json();
      })
      .then(json => {
        dispatch({ type: actionTypes.DELETE_NOTE_SUCCESS, noteId: json })
      })
      .catch(err => {
        console.log('err in deleting note', err);
      });
    } else {
      offlineMode();
    }
  };
};

export const updateUserNoteAction = (note, history) => {
  return (dispatch, getState) => {
    note.lastSaved = new Date();

    // use localstorage for offline mode

    function offlineMode () {
      if (localStorage && localStorage.notes) {
        let parsedNotes = JSON.parse(localStorage.notes);

        // remove the note that is updated in the localStrage notes
        // array and replace it with the latest note that
        // was made by the user
        for (let i = 0; i < parsedNotes.length; i++) {
          if (parsedNotes[i]._id == note._id) {
            parsedNotes.splice(i, 1, note)
          }
        }

        // if the note was created offline
        // we need to update the note in the createdNotes array
        // and not push it into the updatedNotes array
        // because it has a fake ID

        let noteCreatedOffline = false;
        if (localStorage.createdNotes) {
          let parsedCreatedNotesArray = JSON.parse(localStorage.createdNotes)
          
          for (let i = 0; i < parsedCreatedNotesArray.length; i++) {
            if (parsedCreatedNotesArray[i]._id == note._id) {
              noteCreatedOffline = true;
              parsedCreatedNotesArray.splice(i, 1, note);
              break;
            }
          }

          localStorage.setItem('createdNotes', JSON.stringify(parsedCreatedNotesArray));
        }

        // if the note was edited more then once replace it
        if (localStorage.updatedNotes) {
          let parsedUpdatedNotes = JSON.parse(localStorage.updatedNotes);

          for (let i = 0; i < parsedUpdatedNotes.length; i++) {
            if (parsedUpdatedNotes[i]._id == note._id) {
              parsedUpdatedNotes.splice(i, 1);
              break;
            }
          }

          localStorage.setItem('updatedNotes', JSON.stringify(parsedUpdatedNotes))
        }               

        // if the note was created offline and it was updated
        // do not push it into the updatedNotes array

        if (!noteCreatedOffline) {
          if (localStorage.updatedNotes === undefined) {
            localStorage.setItem('updatedNotes', JSON.stringify([note]));
          } else {
            let updatedNotes = JSON.parse(localStorage.updatedNotes);
            updatedNotes.push(note);
            localStorage.setItem('updatedNotes', JSON.stringify(updatedNotes));
          }
        }

        localStorage.setItem('notes', JSON.stringify(parsedNotes));

        history.push('/note/' + note._id);
      }
    }
    
    
    if (navigator.onLine) {
      fetch(config.BACKEND_URL + '/note/' + note._id, {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        method: 'PUT',
        body: JSON.stringify(note)
      })
      .then(res => {
        history.push('/note/' + note._id);
        dispatch({ type: actionTypes.UPDATE_NOTE_SUCCESS });
      })
      .catch(err => {
        dispatch({ type: actionTypes.UPDATE_NOTE_ERROR, err });
      });
    } else {
      offlineMode();
    }
  }
}