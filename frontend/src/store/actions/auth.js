import * as actionTypes from './actionTypes';
const config = require('../../config/config');

export const RegisterAction = (user, history) => {
  return (dispatch, getState) => {
    console.log('attempting to register', user);
    fetch(config.BACKEND_URL +'/register', {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(user)
    })
    .then(response => {
      if (!response.ok) {
        dispatch({ type: actionTypes.REGISTER_ERROR, err: 'Email is already in use' })
      } else {
        history.push('/login');
        dispatch({ type: actionTypes.REGISTER_SUCCESS });
      }
    })
    .catch((err) => {
      dispatch({ type: actionTypes.REGISTER_ERROR, err });
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
            return dispatch({ type: actionTypes.LOGIN_ERROR, err: text })
          });
        }

        return dispatch({ type: actionTypes.LOGIN_SUCCESS })
    });
  };
};

export const userIsLogin = () => {
  return (dispatch, getState) => {
    if (navigator.onLine) {
      fetch(config.BACKEND_URL + '/userislogin', {
        credentials: 'include'
      })
      .then((res) => {
        // if the user is offline use a success action
        if (!res.ok && res.status !== 500) {
          return dispatch({ type: actionTypes.CHECK_USER_AUTH_ERROR });
        } else {
          return dispatch({ type: actionTypes.CHECK_USER_AUTH_SUCCESS });
        }
      })
      .catch(err => dispatch({ type: actionTypes.CHECK_USER_AUTH_SUCCESS }) );
    } else {
      return dispatch({ type: actionTypes.CHECK_USER_AUTH_SUCCESS });
    }
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
        return dispatch({ type: actionTypes.USER_LOGOUT_ERROR });
      } else {
        return dispatch({ type: actionTypes.USER_LOGOUT_SUCCESSFUL });
      }
    })
    .catch(err => console.log(err));
  }
};