import * as actionTypes from '../actions/actionTypes';

var initState = {
  authError: null,
  userIsLogin: false
};

const authReducer = (state=initState, action) => {
  switch (action.type) {
    case actionTypes.REGISTER_SUCCESS:
      console.log('attempted to register successfully');
      return {
        ...state,
        authError: null
      };
    case actionTypes.LOGIN_SUCCESS:
      console.log('attempted to login successfully');
      return {
        ...state,
        authError: null,
        userIsLogin: true
      }
    case actionTypes.LOGIN_ERROR:
      console.log('LOGIN FAILED');
      return {
        ...state,
        authError: action.err,
        userIsLogin: false
      }
    case actionTypes.CHECK_USER_AUTH_SUCCESS:
      console.log('user is login')
      return {
        ...state,
        userIsLogin: true
      }
    case actionTypes.CHECK_USER_AUTH_ERROR:
      console.log('user is NOT login')
      return {
        ...state,
        userIsLogin: false
      }
    case actionTypes.USER_LOGOUT_SUCCESSFUL:
      console.log('user is logout')
      return {
        ...state,
        userIsLogin: false
      }
    case actionTypes.USER_LOGOUT_ERROR:
      console.log('user is NOT logout')
      return {
        ...state,
        userIsLogin: true
      }
    default: 
      console.log('action does not exist');
      return state
  }
}

export default authReducer;