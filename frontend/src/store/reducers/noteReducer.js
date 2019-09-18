import * as actionTypes from '../actions/actionTypes';

let initState = {
  notes: [],
  note: null
}

const noteReducer = (state=initState, action) => {
  switch(action.type) {
    case actionTypes.RETRIEVE_NOTES_SUCCESS:
      return {
        notes: action.notes
      }
    case actionTypes.RETRIEVE_SINGLE_NOTE_SUCCESS:
      return {
        note: action.note
      }

    case actionTypes.CREATE_NOTE_SUCCESS:
      return {
        note: action.note
      }

    default:
      return state
  }
}

export default noteReducer;
