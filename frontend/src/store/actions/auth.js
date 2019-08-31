const config = require('../../config/config');

export const RegisterAction = (user) => {
  return (dispatch, getState) => {
    console.log('attempting to register', user);
    fetch(config.BACKEND_URL +'/register', {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(user)
    })
    .then(response => {
      dispatch({ type: 'REGISTER_SUCCESS' })
    });
  }
}

export const LoginAction = (user) => {
  return (dispatch, getState) => {
    console.log('attempting to login user');
    fetch(config.BACKEND_URL+'/login', {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(user)
    })
    .then(response => {
      if (!response.ok) {
        return response.text()
          .then(text => {
            return dispatch({ type: 'LOGIN_ERROR', err: text })
          });
        }

        return dispatch({ type: 'LOGIN_SUCCESS' })
    });
  }
}