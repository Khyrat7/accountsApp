import React, {useContext, useLayoutEffect, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {Item, HeaderButtons} from 'react-navigation-header-buttons';

// Redux imports
import {useSelector, useDispatch} from 'react-redux';
import * as accountActions from '../store/actions/accountActions';

import {ThemeContext} from '../context/LayoutContext';
import Colors from '../constants/Colors';
import Constants from '../constants/PhoneDimentions';
import HeaderButton from '../components/HeaderButton';
import Card from '../components/Card';

export default AccountsScreen = props => {
  const userID = auth().currentUser.uid;
  const dispatch = useDispatch();
  const accounts = useSelector(state => state.accounts);
  const {navigation, route} = props;
  const {themeColors} = useContext(ThemeContext);

  // console.log('all accounts : ', accounts.all);
  // console.log('enabled accounts : ', accounts.enabled);
  // console.log('disabled accounts : ', accounts.disabled);

  dispatch(accountActions.getAccountsData(userID));
  useEffect(() => {}, [navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'My Accounts',
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Home"
            iconName="file-tray-stacked-outline"
            iconSize={RFPercentage(3)}
            onPress={() => navigation.toggleDrawer()}
          />
        </HeaderButtons>
      ),
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Add Account"
            iconName="add"
            iconSize={RFPercentage(3)}
            onPress={() => {
              navigation.navigate('AccountScreen');
            }}
          />
        </HeaderButtons>
      ),
    });
  });

  // Styles

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      // justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'stretch',
      backgroundColor: themeColors.background,
    },
    card: {
      paddingVertical: 10,
    },
    cardTitle: {
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: RFPercentage(3),
      marginVertical: 5,
      color: themeColors.mainFont,
    },
    cardField: {
      flexDirection: 'row',
      marginVertical: 10,
      paddingHorizontal: 10,
    },
    title: {
      fontWeight: 'bold',
      fontSize: RFPercentage(2.5),
      color: themeColors.mainFont,
    },
    text: {
      fontSize: RFPercentage(2.5),
      color: themeColors.mainFont,
    },
    separator: {
      alignSelf: 'center',
      borderBottomColor: themeColors.border,
      borderBottomWidth: 0.3,
      width: '100%',
    },
  });

  return (
    <View style={styles.container}>
      <ScrollView>
        {accounts.all.map(account => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('AccountScreen', {account: account});
              }}
              key={account.ID}>
              <Card style={styles.card}>
                <Text style={styles.cardTitle}> {account.info.name}</Text>
                <View style={styles.separator}></View>
                <View style={styles.cardField}>
                  <Text style={styles.title}>Balance: </Text>
                  <Text style={styles.text}>
                    {account.info.balance} {'   '} {account.info.currency}
                  </Text>
                </View>

                <View style={styles.cardField}>
                  <Text style={styles.title}>Account Type: </Text>
                  <Text style={styles.text}>{account.info.type}</Text>
                </View>
              </Card>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};
