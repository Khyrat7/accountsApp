import * as types from './actionTypes';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const userID = auth().currentUser ? auth().currentUser.uid : null;

export const addNewAccountsuccess = accounts => {
  return {
    type: types.ADD_NEW_ACCOUNT_SUCCESS,
    accounts,
  };
};

export const getAccountsDataSuccess = accounts => {
  return {
    type: types.GET_ACCOUNTS_DATA_SUCCESS,
    accounts,
  };
};

export const updateAccountInfoSuccess = accounts => {
  return {
    type: types.UPDATE_ACCOUNT_INFO_SUCCESS,
    accounts,
  };
};

export const getAccountInfoSuccesss = account => {
  return {
    type: types.GET_ACCOUNT_INFO_SUCCESS,
    account,
  };
};

export const toggleAccountStatusSuccess = accounts => {
  return {
    type: types.TOGGLE_ACCOUNT_STATUS_SUCCESS,
    accounts,
  };
};

export const deleteAccountSuccess = accounts => {
  return {
    type: types.DELETE_ACCOUNT_SUCCESS,
    accounts,
  };
};
//
//
//
//
//
//
//
//
//
//
// ________________________ Thunks ________________________
export const addNewAccount = (userID, account) => {
  return async dispatch => {
    var accounts = [];

    const newAccount = firestore()
      .collection('userObjects')
      .doc(userID)
      .collection('accounts')
      .doc();

    let accountID = newAccount.id;

    await firestore()
      .collection('userObjects')
      .doc(userID)
      .collection('accounts')
      .doc(accountID)
      .set({
        ...account,
        ID: accountID,
      })
      .catch(err => {
        console.log(err);
      });

    await firestore()
      .collection('userObjects')
      .doc(userID)
      .collection('accounts')
      .get()
      .then(data => {
        data.forEach(account => {
          accounts.push(account.data());
        });
      })
      .catch(err => {
        console.log(err);
      });
    dispatch({type: types.ADD_NEW_ACCOUNT_SUCCESS, accounts: accounts});
  };
};

export const getAccountsData = userID => {
  return async dispatch => {
    var accounts = [];

    await firestore()
      .collection('userObjects')
      .doc(userID)
      .collection('accounts')
      .get()
      .then(data => {
        data.forEach(account => {
          accounts.push(account.data());
        });
      })
      .catch(err => {
        console.log(err);
      });

    dispatch({type: types.GET_ACCOUNTS_DATA_SUCCESS, accounts: accounts});
  };
};

export const updateAccountInfo = (accountID, info) => {
  return async dispatch => {
    var accounts = [];

    await firestore()
      .collection('userObjects')
      .doc(userID)
      .collection('accounts')
      .doc(accountID)
      .update({
        info: info,
      })
      .catch(err => {
        console.log('errrrrrorrrr:', err);
      });

    await firestore()
      .collection('userObjects')
      .doc(userID)
      .collection('accounts')
      .get()
      .then(data => {
        data.forEach(account => {
          accounts.push(account.data());
        });
      });

    dispatch({type: types.UPDATE_ACCOUNT_INFO_SUCCESS, accounts: accounts});
  };
};

export const getAccountInfo = accountID => {
  return async dispatch => {
    var accountData = {};

    await firestore()
      .collection('userObjects')
      .doc(userID)
      .collection('accounts')
      .doc(accountID)
      .get()
      .then(account => {
        accountData = account.data();
      })
      .catch(err => {
        console.log(err);
      });

    dispatch({type: types.GET_ACCOUNT_INFO_SUCCESS, accounts: accountData});
  };
};

export const toggleAccountStatus = (accountID, status) => {
  return async dispatch => {
    var accounts = [];
    let newStatus = status === 'enabled' ? 'disabled' : 'enabled';

    await firestore()
      .collection('userObjects')
      .doc(userID)
      .collection('accounts')
      .doc(accountID)
      .update({
        status: newStatus,
      })
      .catch(err => {
        console.log(err);
      });

    await firestore()
      .collection('userObjects')
      .doc(userID)
      .collection('accounts')
      .get()
      .then(data => {
        data.forEach(account => {
          accounts.push(account.data());
        });
      })
      .catch(err => {
        console.log(err);
      });

    dispatch({type: types.TOGGLE_ACCOUNT_STATUS_SUCCESS, accounts: accounts});
  };
};
