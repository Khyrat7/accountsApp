import React, {useContext, useLayoutEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import Dialog from 'react-native-dialog';
import {Item, HeaderButtons} from 'react-navigation-header-buttons';
import Icon from 'react-native-vector-icons/Ionicons';
import {Picker} from '@react-native-picker/picker';

import {ThemeContext} from '../context/LayoutContext';
import Colors from '../constants/Colors';
import Constants from '../constants/PhoneDimentions';
import HeaderButton from '../components/HeaderButton';
import CurrencyData from '../modules/CurrencyModule';
import CurrencyModule from '../modules/CurrencyModule';

export default NewAccountScreen = props => {
  const {navigation, route} = props;
  const {themeColors} = useContext(ThemeContext);

  const [titleDialog, setTitleDialog] = useState(false);
  const [balanceDialog, setBalanceDialog] = useState(false);
  const [noteVisible, setNoteVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [note, setNote] = useState('');
  const [balance, setBalance] = useState(0);
  const [tempText, setTempText] = useState('');
  const [currencyPicker, setCurrencyPicker] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'New Account',
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Back"
            iconName="chevron-back-outline"
            iconSize={RFPercentage(3)}
            onPress={() => {
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
            onPress={() => {}}
          />
        </HeaderButtons>
      ),
    });
  });

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
      backgroundColor: themeColors.header,
    },
    cellTextHeader: {
      fontSize: RFPercentage(2.5),
      fontWeight: 'bold',
      color: themeColors.headerFont,
    },
    cellText: {
      fontSize: RFPercentage(2.5),
      color: themeColors.headerFont,
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
      borderBottomColor: themeColors.headerFont,
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
      color: themeColors.headerFont,
      borderBottomColor: themeColors.border,
      borderBottomWidth: 0.3,
      width: '70%',
    },
  });

  return (
    <View style={styles.mainView}>
      <ScrollView>
        <View style={styles.containerView}>
          <View /// Account Title Dialog
          >
            <Dialog.Container visible={titleDialog}>
              <Dialog.Title>New Account</Dialog.Title>
              <Dialog.Description>
                Please type the new account title.
              </Dialog.Description>
              <TextInput
                style={styles.dialogInput}
                placeholder={title ? title : 'Enter Account Title.'}
                onChangeText={text => {
                  setTempText(text);
                }}
                keyboardType="email-address"
              />

              <Dialog.Button
                label="Cancel"
                onPress={() => {
                  setTitleDialog(false);
                }}
              />
              <Dialog.Button
                label="save"
                onPress={() => {
                  setTitle(tempText);
                  setTitleDialog(false);
                }}
              />
            </Dialog.Container>
          </View>

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

          <TouchableOpacity // Account Name
            onPress={() => {
              setTitleDialog(true);
              setCurrencyPicker(false);
            }}>
            <View style={styles.cellView}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.cellTextHeader}>Account Name :{'  '}</Text>
                <Text style={styles.cellText}>{title}</Text>
              </View>
              <Icon
                name="chevron-forward-outline"
                size={RFPercentage(3)}
                color={themeColors.headerFont}
              />
            </View>
          </TouchableOpacity>

          <View style={styles.separator}></View>

          <TouchableOpacity // Account Currency
            onPress={() => {
              setCurrencyPicker(!currencyPicker);
            }}>
            <View style={styles.cellView}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.cellTextHeader}>Currency :{'  '}</Text>
                <Text style={styles.cellText}>{currency}</Text>
              </View>
              <Icon
                name="chevron-forward-outline"
                size={RFPercentage(3)}
                color={themeColors.headerFont}
              />
            </View>
          </TouchableOpacity>
          {!currencyPicker ? null : (
            <Picker
              selectedValue={currency}
              enabled={true}
              onValueChange={(itemValue, itemIndex) => setCurrency(itemValue)}>
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

          <View style={styles.separator}></View>

          <TouchableOpacity // Account Balance
            onPress={() => {
              setBalanceDialog(!balanceDialog);
              setCurrencyPicker(false);
              console.log('hi');
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
                color={themeColors.headerFont}
              />
            </View>
          </TouchableOpacity>
          <View style={styles.separator}></View>

          <View /// Account Note
          ></View>
          <View style={{marginBottom: 10}}>
            <TouchableOpacity
              onPress={() => {
                setNoteVisible(!noteVisible);
                setCurrencyPicker(false);
              }}>
              <View
                style={styles.cellView} // Account Note
              >
                <Text style={styles.cellTextHeader}>Note :{'  '}</Text>
                <Icon
                  name="chevron-forward-outline"
                  size={RFPercentage(3)}
                  color={themeColors.headerFont}
                />
              </View>
              <Text style={styles.cellText}>{note}</Text>
            </TouchableOpacity>
          </View>

          {!noteVisible ? null : (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 20,
                marginVertical: 20,
              }}>
              <TextInput
                style={styles.textInput}
                placeholder={'Enter Account Note.'}
                placeholderTextColor={themeColors.mainFont}
                onChangeText={text => {
                  setTempText(text);
                }}
                keyboardType="email-address"
                numberOfLines={3}
              />
              <TouchableOpacity
                onPress={() => {
                  setNoteVisible(false);
                }}>
                <Icon name="close" size={RFPercentage(5)} color={Colors.red} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setNote(tempText);
                  setNoteVisible(false);
                }}>
                <Icon
                  name="checkmark"
                  size={RFPercentage(5)}
                  color={Colors.green}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};
