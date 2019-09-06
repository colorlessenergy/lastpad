let initState = {
  notes: []
}

const noteReducer = (state=initState, action) => {
  switch(action.type) {
    case 'RETRIEVE_NOTES_SUCCESS':
      return {
        notes: action.notes
      }
    default:
      return state
  }
}

export default noteReducer;
