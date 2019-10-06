const config = require('../config/config');

export function createOfflineToOnline () {
  if (navigator.onLine && localStorage) {
    // send request to send new data created
    if (localStorage.createdNotes && JSON.parse(localStorage.createdNotes).length > 0) {
      let createdNoteLocalStorage = localStorage.createdNotes;
      let createdNotes = JSON.parse(createdNoteLocalStorage);

      // loop through all notes created offline and make a fetch
      // post request to create them in the DB
      createdNotes.forEach((note) => {

        fetch(config.BACKEND_URL + '/note', {
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          method: 'POST',
          body: JSON.stringify(note)
        })
        .catch((err) => console.log(err));

      });

      localStorage.removeItem('createdNotes');
    }

    // send request to delete notes that where made offline
    if (localStorage.deletedNotes && JSON.parse(localStorage.deletedNotes).length > 0) {
      let deletedNotesLocalStorage = localStorage.deletedNotes;
      let deletedNotes = JSON.parse(deletedNotesLocalStorage);

      // loop through all deletedNotes and make a request to delete a note in mongoDB
      deletedNotes.forEach(note => {
        fetch(config.BACKEND_URL + '/note/' + note._id, {
          credentials: 'include',
          method: 'DELETE'
        })
          .catch(err => {
            console.log('err in deleting note', err);
          });
      });

      // remove deletedNotes from localStorage
      localStorage.removeItem('deletedNotes');
    }
  }
}