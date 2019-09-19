import * as actionTypes from './actionTypes';
const config = require('../../config/config');

export const GetAllUserNotesAction = () => {
  return (dispatch, getState) => {
    fetch(config.BACKEND_URL + '/note', {
      credentials: 'include'
    })
    .then(response => {
      return response.json()
        .then((notes) => {
          dispatch({ type: actionTypes.RETRIEVE_NOTES_SUCCESS, notes })
        })
    })
    .catch(err => console.log(err));
  };
};

export const getUserNoteAction = (noteId, history) => {
  return (dispatch, getState) => {
    fetch(config.BACKEND_URL + '/note/' + noteId, {
      credentials: 'include'
    })
    .then(response => {
      return response.json()
        .then(note => {
          dispatch({ type: actionTypes.RETRIEVE_SINGLE_NOTE_SUCCESS, note });
        })
    })
    .catch(err => {
      return history.push('/');
    });
  };
};

export const createNoteAction = (note, history) => {
  return (dispatch, getState) => {
    fetch(config.BACKEND_URL + '/note', {
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(note)
    })
    .then(response => {
      return response.json()
        .then(note => {
          history.push('/note/'+ note._id);
          dispatch({ type: actionTypes.CREATE_NOTE_SUCCESS, note })
        });
    })
    .catch(err => {
      history.push('/');
    })
  }
}