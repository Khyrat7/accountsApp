import firestore from '@react-native-firebase/firestore';
import initialState from './initialState';
import * as types from '../actions/actionTypes';

const userReducer = (state = initialState.user, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default userReducer;
