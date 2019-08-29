export const RegisterAction = (user) => {
  return (dispatch, getState) => {
    console.log('attempting to register', user);
    fetch('http://localhost:3001/register', {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(user)
    })
    .then(response => {
      console.log(response)
      dispatch({ type: 'REGISTER_SUCCESS' })
    });
  }
}

export const LoginAction = (user) => {
  return (dispatch, getState) => {
    console.log('attempting to login user');
    fetch('http://localhost:3001/login', {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(user)
    })
    .then(response => {
      console.log(response)
      dispatch({ type: 'LOGIN_SUCCESS' })
    });
  }
}