let initState = {
  notes: [],
  note: null
}

const noteReducer = (state=initState, action) => {
  switch(action.type) {
    case 'RETRIEVE_NOTES_SUCCESS':
      return {
        notes: action.notes
      }
    case 'RETRIEVE_SINGLE_NOTE_SUCCESS':
      return {
        note: action.note
      }
    default:
      return state
  }
}

export default noteReducer;
