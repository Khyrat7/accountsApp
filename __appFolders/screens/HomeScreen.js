// Issues to fix :
// - Google Auth.
// - Phone Auth.
// - Facebook Auth.
// - Apple Auth.

import React, {useState, useLayoutEffect, useContext, useEffect} from 'react';
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
  Dimensions,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {Item, HeaderButtons} from 'react-navigation-header-buttons';

//_________ Redux imports _________
import {useSelector, useDispatch} from 'react-redux';
import * as userActions from '../store/actions/userActions';
import * as accountsActions from '../store/actions/accountActions';

import HeaderButton from '../components/HeaderButton';
import {ThemeContext} from '../context/LayoutContext';
import Colors from '../constants/Colors';
import Constants from '../constants/PhoneDimentions';
import DismissKeyboard from '../components/DismissKeyboard';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';

export default HomeScreen = props => {
  const dispatch = useDispatch();

  // Props & Hooks
  const {navigation, route} = props;
  const {themeColors} = useContext(ThemeContext);

  const userID = auth().currentUser.uid;
  // console.log(auth().currentUser);

  useEffect(() => {
    try {
      dispatch(userActions.getUserProfile(userID));
      dispatch(accountsActions.getAccountsData(userID));
      checkUserProfile();
    } catch (error) {
      console.log(error);
    }
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Main',
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Home"
            // iconName="file-tray-stacked-outline"
            iconName="file-tray-stacked-outline"
            iconSize={RFPercentage(3)}
            onPress={() => navigation.toggleDrawer()}
          />
        </HeaderButtons>
      ),
    });
  });

  const checkUserProfile = async () => {
    // checking if the signed user has a profile or not (in case of signing with Google)
    let user = false;
    await firestore()
      .collection('users')
      .doc(userID)
      .get()
      .then(res => {
        if (res.data()) {
          user = true;
        }
      });

    if (!user) {
      firestore()
        .collection('users')
        .doc(userID)
        .set({
          userID: userID,
          email: auth().currentUser.email,
          createdAt: new Date().toUTCString(),
          name: '',
        })
        .then(
          // Creating a user object and setting the default app settings.
          firestore().collection('userObjects').doc(userID).set({
            appTheme: 'light',
          }),
        )
        .catch(e => {
          console.log(e);
        });
    }
  };

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
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text>Bezier Line Chart</Text>
        <LineChart
          data={{
            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
            datasets: [
              {
                data: [
                  // Math.random() * 100,
                  // Math.random() * 100,
                  // Math.random() * 100,
                  // Math.random() * 100,
                  // Math.random() * 100,
                  // Math.random() * 100,
                  1, 2, 3, 4, 5, 6,
                ],
              },
            ],
          }}
          width={Dimensions.get('window').width * 0.9} // from react-native
          height={220}
          yAxisLabel="$"
          yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>
    </View>
  );
};
