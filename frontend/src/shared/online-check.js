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
  }
}