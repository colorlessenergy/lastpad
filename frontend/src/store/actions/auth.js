const config = require('../../config/config');

export const RegisterAction = (user) => {
  return (dispatch, getState) => {
    console.log('attempting to register', user);
    fetch(config.BACKEND_URL +'/register', {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(user)
    })
    .then(response => {
      dispatch({ type: 'REGISTER_SUCCESS' })
    });
  };
};

export const LoginAction = (user) => {
  return (dispatch, getState) => {
    console.log('attempting to login user');
    fetch(config.BACKEND_URL+'/login', {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      credentials: 'include',
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
  };
};

export const userIsLogin = () => {
  return (dispatch, getState) => {
    fetch(config.BACKEND_URL + '/userislogin', {
      credentials: 'include'
    })
    .then((res) => {
      if (!res.ok) {
        return dispatch({ type: 'CHECK_USER_AUTH_ERROR' });
      } else {
        return dispatch({ type: 'CHECK_USER_AUTH_SUCCESS' });
      }
    })
    .catch(err => console.log(err));
  }
};

export const logoutUser = () => {
  return (dispatch, getState) => {
    fetch(config.BACKEND_URL + '/logout', {
      credentials: 'include',
      method: 'DELETE'
    })
    .then((res) => {
      if (!res.ok) {
        return dispatch({ type: 'USER_LOGOUT_ERROR' });
      } else {
        return dispatch({ type: 'USER_LOGOUT_SUCCESSFUL' });
      }
    })
    .catch(err => console.log(err));
  }
};