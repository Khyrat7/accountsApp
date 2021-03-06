import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {createStackNavigator} from '@react-navigation/stack';
import {ThemeContext} from '../context/LayoutContext';
import Colors from '../constants/Colors';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  const {themeColors} = useContext(ThemeContext);

  return (
    <NavigationContainer>
      <Stack.Navigator
        // Stack Screens common options and styling
        name="accountsApp"
        initialRouteName="SplashScreen"
        screenOptions={{
          headerStyle: {
            backgroundColor: themeColors.header,
          },
          animationEnabled: false,

          headerTintColor: Colors.white,

          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: RFPercentage(2),
          },
        }}>
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{headerShown: false, title: ' '}}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{headerShown: true, title: ' '}}
        />

        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{headerShown: true, title: ' '}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStackNavigator;
