// enable the save button
// enable save based on the screen title (new or edit account)
// validate user input
// add event listner for the back navigation
// enable the buttons funcions
// add the account statistics (total spendings, total income, total Transfer in, total Transfer out) date opened -- currnet date

import React, {useContext, useLayoutEffect, useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import Dialog from 'react-native-dialog';
import {Item, HeaderButtons} from 'react-navigation-header-buttons';
import Icon from 'react-native-vector-icons/Ionicons';
import {Picker} from '@react-native-picker/picker';

// Redux imports
import {useSelector, useDispatch} from 'react-redux';
import * as accountActions from '../store/actions/accountActions';

import {ThemeContext} from '../context/LayoutContext';
import Colors from '../constants/Colors';
import Constants from '../constants/PhoneDimentions';
import HeaderButton from '../components/HeaderButton';
import CurrencyData from '../modules/CurrencyModule';
import TextInputField from '../components/TextInputField';
import LoginButton from '../components/LoginButton';

export default AccountScreen = props => {
  const dispatch = useDispatch();
  const userID = auth().currentUser.uid;

  const {navigation, route} = props;
  const accountData = route.params ? route.params.account : null;
  //
  //
  // behavior states
  const {themeColors} = useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  const [edited, setEdited] = useState(false);
  const [titleVisible, setTitleVisible] = useState(false);
  const [balanceDialog, setBalanceDialog] = useState(false);
  const [noteVisible, setNoteVisible] = useState(false);
  const [currencyPicker, setCurrencyPicker] = useState(false);
  const [typePicker, setTypePicker] = useState(false);
  //
  //
  //
  // field states
  const [title, setTitle] = useState(accountData ? accountData.info.name : '');
  const [titleError, setTitleError] = useState('');
  const [type, setType] = useState(accountData ? accountData.info.type : '');
  const [status, setStatus] = useState(
    accountData ? accountData.info.status : 'enabled',
  );
  const [note, setNote] = useState(accountData ? accountData.info.note : '');
  const [balance, setBalance] = useState(
    accountData ? accountData.info.balance : 0,
  );
  const [currency, setCurrency] = useState(
    accountData ? accountData.info.currency : 'USD',
  );
  const [tempText, setTempText] = useState('');

  const screenTitle = accountData ? 'Edit Account' : 'New Account';
  const accountTypes = ['Prepaid Account', 'Credit Account', 'Saving Account'];

  useLayoutEffect(() => {
    navigation.setOptions({
      title: screenTitle,
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Back"
            iconName="chevron-back-outline"
            iconSize={RFPercentage(3)}
            onPress={() => {
              console.log('hi');
              navigation.goBack();
            }}
          />
        </HeaderButtons>
      ),
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Save"
            iconName="save"
            iconSize={RFPercentage(3)}
            onPress={async () => {
              await handleSavePressed();
            }}
          />
        </HeaderButtons>
      ),
    });
  });
  //
  //
  //
  // Functions
  const handleSavePressed = async () => {
    if (!edited) return;
    // console.log('form is valididity function ', validateForm());
    if (validateForm() === false) return;

    setIsLoading(true);

    if (screenTitle === 'New Account') {
      // Case New Account
      const accountData = {
        createdDate: new Date().toUTCString(),
        status: 'enabled',
        info: {
          name: title,
          currency: currency,
          balance: balance,
          type: type,
          note: note,
        },
      };
      try {
        await dispatch(accountActions.addNewAccount(userID, accountData));
      } catch (err) {
        console.log(err);
      }
    } else {
      // Case Edit Account
      const info = {
        name: title,
        currency: currency,
        balance: balance,
        type: type,
        note: note,
        status: status,
      };

      setEdited(false);
      try {
        console.log('account ID : ', accountData.ID);
        console.log('account Data : ', info);

        await dispatch(accountActions.updateAccountInfo(accountData.ID, info));
      } catch (err) {
        console.log(err);
      }
    }
    setIsLoading(false);
    // navigation.goBack();
  };

  const validateForm = () => {
    let titleLength = title.trim().length;
    // console.log(titleLength);
    if (titleLength === 0 || !title) {
      setTitleError('Please enter the account name.');
      setFormIsValid(false);
      return false;
    } else {
      setFormIsValid(true);
      return true;
    }
  };
  //
  //
  //
  // Styles
  const styles = StyleSheet.create({
    mainView: {
      flex: 1,
      backgroundColor: themeColors.background,
    },
    containerView: {
      marginVertical: 15,
      width: '100%',
      borderBottomColor: themeColors.border,
      borderTopColor: themeColors.border,
      borderBottomWidth: 1,
      borderTopWidth: 1,
      backgroundColor: themeColors.section,
    },
    cellTextHeader: {
      fontSize: RFPercentage(2.5),
      fontWeight: 'bold',
      color: themeColors.mainFont,
    },
    cellText: {
      fontSize: RFPercentage(2.5),
      color: themeColors.mainFont,
      textAlign: 'left',
      marginHorizontal: 15,
    },
    cellView: {
      marginHorizontal: 15,
      marginVertical: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      // paddingVertical: 10,
    },
    separator: {
      alignSelf: 'center',
      borderBottomColor: themeColors.border,
      borderBottomWidth: 0.3,
      width: '95%',
    },
    dialogInput: {
      borderBottomWidth: 0.3,
      fontSize: RFPercentage(2),
      paddingHorizontal: 7,
      marginHorizontal: 10,
      borderRadius: 10,
      paddingVertical: 5,
      marginVertical: 10,
    },
    textInput: {
      color: themeColors.mainFont,
      borderBottomColor: themeColors.border,
      borderBottomWidth: 0.3,
      width: '70%',
    },
    buttons: {
      width: '50%',
      borderRadius: 20,
    },
    errorText: {
      color: Colors.red,
      textAlign: 'center',
      fontSize: RFPercentage(2),
      marginBottom: 5,
    },
  });

  return (
    <View style={styles.mainView}>
      <View // Activity Indicator
      >
        {isLoading ? (
          <View style={{marginVertical: 5}}>
            <ActivityIndicator size={'large'} />
          </View>
        ) : null}
      </View>
      <ScrollView>
        <View style={styles.containerView}>
          <View /// Account Balance Dialog
          >
            <Dialog.Container visible={balanceDialog}>
              <Dialog.Title>Initial Balance</Dialog.Title>
              <Dialog.Description>
                please enter the current balance.
              </Dialog.Description>
              <TextInput
                style={styles.dialogInput}
                placeholder={balance ? balance : 'Enter Account Balance.'}
                onChangeText={text => {
                  setTempText(text);
                  setEdited(true);
                }}
                keyboardType="decimal-pad"
              />

              <Dialog.Button
                label="Cancel"
                onPress={() => {
                  setBalanceDialog(false);
                }}
              />
              <Dialog.Button
                label="save"
                onPress={() => {
                  setBalance(tempText);
                  setBalanceDialog(false);
                }}
              />
            </Dialog.Container>
          </View>

          <View // Account Name
          >
            <TextInputField
              fieldPressed={() => {
                setCurrencyPicker(false);
                setTitleVisible(!titleVisible);
                setNoteVisible(false);
                setTypePicker(false);
                validateForm();
              }}
              visible={noteVisible}
              savePressed={() => {
                setTitle(tempText);
                setTitleVisible(false);
              }}
              cancelPressed={() => {
                setTitleVisible(false);
              }}
              deletePressed={() => {
                setTitle(' ');
                setTitleVisible(false);
              }}
              fieldValue={title}
              fieldStyle="row"
              visible={titleVisible}
              title="Account Name:"
              placeholder={title ? title : 'Enter the account name.'}
              keyboardType="email-address"
              onChangeText={text => {
                setTempText(text);
                setEdited(true);
              }}
              onFocus={() => {
                setTitleError('');
              }}
            />
            {titleError ? (
              <View>
                <Text style={styles.errorText}>{titleError}</Text>
              </View>
            ) : null}
          </View>

          <View style={styles.separator}></View>

          <View // Account Currency
          >
            <TouchableOpacity
              onPress={() => {
                setCurrencyPicker(!currencyPicker);
                setNoteVisible(false);
                setTitleVisible(false);
                setTypePicker(false);
              }}>
              <View style={styles.cellView}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.cellTextHeader}>Currency :{'  '}</Text>
                  <Text style={styles.cellText}>{currency}</Text>
                </View>
                <Icon
                  name="chevron-forward-outline"
                  size={RFPercentage(3)}
                  color={themeColors.mainFont}
                />
              </View>
            </TouchableOpacity>
            {!currencyPicker ? null : (
              <Picker
                selectedValue={currency}
                enabled={true}
                onValueChange={(itemValue, itemIndex) => {
                  setCurrency(itemValue);
                  setEdited(true);
                }}>
                {CurrencyData.map((element, index) => {
                  return (
                    <Picker.Item
                      label={element.currency}
                      value={element.value}
                      key={index}
                      color={themeColors.mainFont}
                    />
                  );
                })}
              </Picker>
            )}
          </View>

          <View style={styles.separator}></View>

          <View // Account Balance
          >
            <TouchableOpacity
              onPress={() => {
                setBalanceDialog(!balanceDialog);
                setCurrencyPicker(false);
                setNoteVisible(false);
                setTypePicker(false);
              }}>
              <View style={styles.cellView}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.cellTextHeader}>
                    Initial Balance :{'  '}
                  </Text>
                  <Text style={styles.cellText}>{balance}</Text>
                </View>
                <Icon
                  name="chevron-forward-outline"
                  size={RFPercentage(3)}
                  color={themeColors.mainFont}
                />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.separator}></View>

          <View // Account Note
          >
            <TextInputField
              fieldPressed={() => {
                setCurrencyPicker(false);
                setNoteVisible(!noteVisible);
                setTitleVisible(false);
                setTypePicker(false);
              }}
              visible={noteVisible}
              savePressed={() => {
                setNote(tempText);
                setNoteVisible(false);
              }}
              cancelPressed={() => {
                setNoteVisible(false);
              }}
              deletePressed={() => {
                setNote('');
                setNoteVisible(false);
              }}
              fieldValue={note}
              fieldStyle="col"
              title="Note:"
              placeholder={note ? note : 'Enter the account note.'}
              keyboardType="email-address"
              onChangeText={text => {
                setTempText(text);
                setEdited(true);
              }}
            />
          </View>
        </View>
        <View // Action Buttons
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <LoginButton
            style={styles.buttons}
            // isLoading={isLoading}
            onPress={async () => {
              if (validateForm() === false) return;
              setIsLoading(true);

              await dispatch(
                accountActions.toggleAccountStatus(
                  accountData.ID,
                  accountData.status,
                ),
              );
              setStatus(status === 'enabled' ? 'disabled' : 'enabled');
              setIsLoading(false);
              navigation.goBack();
            }}
            title={
              accountData
                ? accountData.status === 'enabled'
                  ? 'Disable'
                  : 'Enable'
                : 'Disable'
            }
            color={themeColors.buttonColor}
          />
          <LoginButton
            style={styles.buttons}
            // isLoading={isLoading}
            onPress={() => {}}
            title="Delete"
            color={themeColors.buttonColor}
          />
        </View>

        <View style={styles.containerView}>
          <View // Account Type
          >
            <TouchableOpacity
              onPress={() => {
                setTypePicker(!typePicker);
                setNoteVisible(false);
                setTitleVisible(false);
              }}>
              <View style={styles.cellView}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.cellTextHeader}>
                    Account Type :{'  '}
                  </Text>
                  <Text style={styles.cellText}>{type}</Text>
                </View>
                <Icon
                  name="chevron-forward-outline"
                  size={RFPercentage(3)}
                  color={themeColors.mainFont}
                />
              </View>
            </TouchableOpacity>
            {!typePicker ? null : (
              <Picker
                selectedValue={type}
                enabled={true}
                onValueChange={(itemValue, itemIndex) => {
                  setType(itemValue);
                  setEdited(true);
                }}>
                {accountTypes.map((element, index) => {
                  return (
                    <Picker.Item
                      label={element}
                      value={element}
                      key={index}
                      color={themeColors.mainFont}
                    />
                  );
                })}
              </Picker>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
