var initState = {
  authError: null,
  userIsLogin: false
};

const authReducer = (state=initState, action) => {
  switch (action.type) {
    case 'REGISTER_SUCCESS':
      console.log('attempted to register successfully');
      return {
        ...state,
        authError: null
      };
    
    case 'LOGIN_SUCCESS':
      console.log('attempted to login successfully');
      return {
        ...state,
        authError: null,
        userIsLogin: true
      }

    case 'LOGIN_ERROR':
      console.log('LOGIN FAILED');
      return {
        ...state,
        authError: action.err,
        userIsLogin: false
      }
    
    case 'CHECK_USER_AUTH_SUCCESS':
      console.log('user is login')
      return {
        ...state,
        userIsLogin: true
      }
    
    case 'CHECK_USER_AUTH_ERROR':
      console.log('user is NOT login')
      return {
        ...state,
        userIsLogin: false
      }

    case 'USER_LOGOUT_SUCCESSFUL':
      console.log('user is logout')
      return {
        ...state,
        userIsLogin: false
      }

    case 'USER_LOGOUT_ERROR':
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