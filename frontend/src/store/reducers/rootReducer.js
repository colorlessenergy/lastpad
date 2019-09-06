import { combineReducers } from 'redux';

import authReducer from './authReducer';
import noteReducer from './noteReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  notes: noteReducer
});

export default rootReducer;