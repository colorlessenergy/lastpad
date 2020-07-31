import * as actionTypes from '../actions/actionTypes';

var initState = {
  authError: null,
  userIsLogin: false
};

const authReducer = (state=initState, action) => {
  switch (action.type) {
    case actionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        authError: null
      };

    case actionTypes.REGISTER_ERROR:
      return {
        ...state,
        authError: action.err
      };

    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        authError: null,
        userIsLogin: true
      }
    case actionTypes.LOGIN_ERROR:
      return {
        ...state,
        authError: action.err,
        userIsLogin: false
      }
    case actionTypes.CHECK_USER_AUTH_SUCCESS:
      return {
        ...state,
        userIsLogin: true
      }
    case actionTypes.CHECK_USER_AUTH_ERROR:
      return {
        ...state,
        userIsLogin: false
      }
    case actionTypes.USER_LOGOUT_SUCCESSFUL:
      return {
        ...state,
        userIsLogin: false
      }
    case actionTypes.USER_LOGOUT_ERROR:
      return {
        ...state,
        userIsLogin: true
      }
    default: 
      return state
  }
}

export default authReducer;