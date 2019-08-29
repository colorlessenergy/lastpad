export const RegisterAction = (user) => {
  return (dispatch, getState) => {
    //  TODO: use axios to hite a endpoint to create a user in the backend
    console.log('attempting to register', user)
    dispatch({ type: 'REGISTER_SUCCESS' })
  }
}

export const LoginAction = (user) => {
  return (dispatch, getState) => {
    //  TODO: use axios to hit a endpoint to login a user in backend
    console.log('attempting to login user');

    dispatch({ type: 'LOGIN_SUCCESS' })
  }
}