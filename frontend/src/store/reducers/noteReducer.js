import * as actionTypes from '../actions/actionTypes';

let initState = {
  notes: [],
  note: null
};

const noteReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.RETRIEVE_NOTES_SUCCESS:
      return {
        notes: action.notes
      };

    case actionTypes.RETRIEVE_SINGLE_NOTE_SUCCESS:
      return {
        note: action.note
      };

    case actionTypes.CREATE_NOTE_SUCCESS:
      return {
        note: action.note
      };

    case actionTypes.DELETE_NOTE_SUCCESS:
      let notes = [...state.notes];
      let filteredNotes = notes.filter(note => {
        return String(note._id) !== String(action.noteId);
      });
      return {
        ...state,
        notes: filteredNotes
      };

    default:
      return state;
  };
};

export default noteReducer;
