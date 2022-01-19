import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Colors from '../constants/Colors';
import {ThemeContext} from '../context/LayoutContext';
import BottomTabNavigator from './BottomTabNavigator';
import DrawerComponent from './DrawerComponent';
import HomeScreen from '../screens/HomeScreen';
import AccountsScreen from '../screens/AccountsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import RecurringScreen from '../screens/RecurringScreen';
import RecentAddedScreen from '../screens/RecentAddedScreen';
import RecentDeletedScreen from '../screens/RecentDeletedScreen';

const Drawer = createDrawerNavigator();

export default DrawerNavigator = () => {
  const {themeColors, theme} = useContext(ThemeContext);

  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerComponent {...props} />}
      name="Accounts App"
      initialRouteName="Main"
      screenOptions={{
        headerShown: false,
        drawerInactiveTintColor: Colors.white,
        drawerActiveTintColor: theme === 'light' ? Colors.blue : Colors.white,
        drawerActiveBackgroundColor:
          theme === 'light' ? Colors.white : Colors.black,
        drawerStyle: {
          backgroundColor: themeColors.header,
          width: 240,
        },
        headerStyle: {
          backgroundColor: themeColors.header,
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: RFPercentage(2),
        },
        drawerType: 'back',

        headerTintColor: Colors.white,
      }}>
      <Drawer.Screen
        name="Main"
        component={BottomTabNavigator}
        options={{
          drawerIcon: ({focused, size}) => (
            <Ionicons
              name="md-home"
              size={size}
              color={focused ? Colors.orange : '#ccc'}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="My Accounts"
        component={AccountsScreen}
        options={{
          headerShown: true,
          drawerIcon: ({focused, size}) => (
            <Ionicons
              name="wallet"
              size={size}
              color={focused ? Colors.orange : '#ccc'}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerShown: true,
          drawerIcon: ({focused, size}) => (
            <Ionicons
              name="settings"
              size={size}
              color={focused ? Colors.orange : '#ccc'}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Recurring"
        component={RecurringScreen}
        options={{
          headerShown: true,
          drawerIcon: ({focused, size}) => (
            <Ionicons
              name="repeat"
              size={size}
              color={focused ? Colors.orange : '#ccc'}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Recently Added"
        component={RecentAddedScreen}
        options={{
          headerShown: true,
          drawerIcon: ({focused, size}) => (
            <Ionicons
              name="md-add-circle-sharp"
              size={size}
              color={focused ? Colors.orange : '#ccc'}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Recently Deleted"
        component={RecentDeletedScreen}
        options={{
          headerShown: true,
          drawerIcon: ({focused, size}) => (
            <Ionicons
              name="md-remove-circle"
              size={size}
              color={focused ? Colors.orange : '#ccc'}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};
