import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RFPercentage} from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/Foundation';
import Icon2 from 'react-native-vector-icons/AntDesign';

//
//_________ Redux imports _________
import {useSelector} from 'react-redux';

import Colors from '../constants/Colors';
import {ThemeContext} from '../context/LayoutContext';
import AddExpenceScreen from '../screens/AddExpenceScreen';
import AddIncomeScreen from '../screens/AddIncomeScreen';
import HomeScreen from '../screens/HomeScreen';

const Tab = createBottomTabNavigator();

export default BottomTabNavigator = () => {
  const {themeColors} = useContext(ThemeContext);
  Icon.loadFont();
  Icon2.loadFont();

  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerStyle: {
          backgroundColor: themeColors.header,
        },
        tabBarActiveTintColor: Colors.orange,
        tabBarInactiveTintColor: Colors.white,

        tabBarStyle: {
          backgroundColor: themeColors.header,
        },

        headerTintColor: Colors.white,

        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: RFPercentage(2),
        },
        tabBarOptions: {
          showIcon: true,
        },
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: true,
          tabBarLabel: 'Home  ',
          tabBarIcon: ({color}) => (
            <Icon2 name="home" color={color} size={RFPercentage(3)} />
          ),
        }}
      />

      <Tab.Screen
        name="AddIncome"
        component={AddIncomeScreen}
        options={{
          headerShown: true,
          tabBarLabel: 'Add Income',

          tabBarIcon: ({color}) => (
            <Icon2 name="pluscircleo" color={color} size={RFPercentage(3)} />
          ),
          // tabBarBadge: totalFavorits,
        }}
      />

      <Tab.Screen
        name="Add Expence"
        component={AddExpenceScreen}
        options={{
          headerShown: true,
          tabBarLabel: 'Add Expence',

          tabBarIcon: ({color}) => (
            <Icon2 name="minuscircleo" color={color} size={RFPercentage(3)} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
