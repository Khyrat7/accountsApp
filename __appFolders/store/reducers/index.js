import {combineReducers} from 'redux';
import userReducer from './userReducer';
import accountsReducer from './accountsReducer';

const rootReducer = combineReducers({
  user: userReducer,
  accounts: accountsReducer,
});

export default rootReducer;
