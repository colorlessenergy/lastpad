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
        return response.json()      
      })
      .then((notes) => {
        // store notes into localstorage
        // to use when the user is offline 

        localStorage.setItem('notes', JSON.stringify(notes));

        dispatch({ type: actionTypes.RETRIEVE_NOTES_SUCCESS, notes });
     })
    .catch(function(error) {
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
      let notes = JSON.parse(localStorage.notes);
  
      let requestedNote = notes.find((noteObj) => {
        return noteObj._id == noteId;
      });

      dispatch({ type: actionTypes.RETRIEVE_SINGLE_NOTE_SUCCESS, note: requestedNote });
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
      if (localStorage.notes) {
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
    fetch(config.BACKEND_URL + '/note/' + noteId, {
      credentials: 'include',
      method: 'DELETE'
    })
    .then(res => {
      return res.json()
        .then(json => {
          dispatch({ type: actionTypes.DELETE_NOTE_SUCCESS, noteId: json })
        });
    })
    .catch(err => {
      console.log('err in deleting note', err);
    });
  };
};

export const updateUserNoteAction = (note, history) => {
  return (dispatch, getState) => {
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
    })
  }
}