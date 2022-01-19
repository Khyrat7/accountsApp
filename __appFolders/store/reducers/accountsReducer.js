import firestore from '@react-native-firebase/firestore';
import initialState from './initialState';
import * as types from '../actions/actionTypes';

const accountsReducer = (state = initialState.accounts, action) => {
  switch (action.type) {
    case types.ADD_NEW_ACCOUNT_SUCCESS:
      return {...state, all: action.accounts};

    case types.GET_ACCOUNTS_DATA_SUCCESS:
      const enabledAccounts = action.accounts.filter(
        acc => acc.status === 'enabled',
      );
      const disabledAccounts = action.accounts.filter(
        acc => acc.status === 'disabled',
      );
      return {
        ...state,
        all: action.accounts,
        enabled: enabledAccounts,
        disabled: disabledAccounts,
      };

    case types.UPDATE_ACCOUNT_INFO_SUCCESS:
      return {...state, all: action.accounts};

    case types.GET_ACCOUNT_INFO_SUCCESS:
      return {...state, active: action.account};

    case types.TOGGLE_ACCOUNT_STATUS_SUCCESS:
      const enabled = action.accounts.filter(acc => acc.status === 'enabled');
      const disabled = action.accounts.filter(acc => acc.status === 'disabled');
      return {
        ...state,
        all: action.accounts,
        enabled: enabled,
        disabled: disabled,
      };

    case types.DELETE_ACCOUNT_SUCCESS:
      return {...state, all: action.accounts};

    default:
      return state;
  }
};

export default accountsReducer;
