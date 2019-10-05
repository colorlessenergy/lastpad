const config = require('../config/config');

export function createOfflineToOnline (props) {
  if (navigator.onLine && localStorage) {
    // send request to send new data created
    if (localStorage.createdNotes && JSON.parse(localStorage.createdNotes).length > 0) {
      let createdNoteLocalStorage = localStorage.createdNotes;
      let createdNotes = JSON.parse(createdNoteLocalStorage);

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