const config = require('../../config/config');


export const GetAllUserNotesAction = () => {
  return (dispatch, getState) => {
    fetch(config.BACKEND_URL + '/note', {
      credentials: 'include'
    })
    .then(response => {
      return response.json()
        .then((notes) => {
          dispatch({ type: 'RETRIEVE_NOTES_SUCCESS', notes });
        })
    })
    .catch(err => console.log(err));
  }
}