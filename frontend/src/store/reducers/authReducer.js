var initState = {
  authError: null
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
        authError: null
      }

    case 'LOGIN_ERROR':
      console.log('LOGIN FAILED');
      return {
        ...state,
        authError: action.err
      }



    default: 
      console.log('action does not exist');
      return state
  }
}

export default authReducer;