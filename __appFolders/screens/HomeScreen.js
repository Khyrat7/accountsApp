// Issues to fix :
// - Google Auth.
// - Phone Auth.
// - Facebook Auth.
// - Apple Auth.

import React, {useState, useLayoutEffect, useContext} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {ThemeContext} from '../context/LayoutContext';
import Colors from '../constants/Colors';
import Constants from '../constants/PhoneDimentions';
import DismissKeyboard from '../components/DismissKeyboard';

export default LoginScreen = props => {
  // Props & Hooks
  const {navigation, route} = props;
  const {themeColors} = useContext(ThemeContext);

  // Styles

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'stretch',
      backgroundColor: themeColors.background,
    },
    headerButton: {
      justifyContent: 'center',
      alignContent: 'center',
      alignSelf: 'center',
      color: Colors.white,
      fontSize: RFPercentage(2),
      marginRight: 15,
    },
    image: {
      width: Constants.screenWidth * 0.4,
      height: Constants.screenWidth * 0.4,
      alignSelf: 'center',
      // top: 5,
      marginBottom: Constants.screenHeight * 0.02,
    },
    text: {
      color: themeColors.titleFont,
      height: '5%',
      width: '80%',
      marginHorizontal: '10%',
      fontSize: RFPercentage(2),
      textAlign: 'center',
      fontWeight: 'bold',
    },
    error: {
      color: Colors.red,
      height: '5%',
      width: '100%',
      fontSize: RFPercentage(2),
      textAlign: 'center',
      fontWeight: 'bold',
    },
    icons: {
      flexDirection: 'row',
      alignContent: 'center',
      alignItems: 'stretch',
      alignSelf: 'center',
      marginBottom: Constants.screenHeight * 0.03,
      marginTop: Constants.screenHeight * 0.01,
      marginHorizontal: '10%',
    },
  });

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          auth().signOut();
        }}>
        <Text>homescreen</Text>
      </TouchableOpacity>
    </View>
  );
};
