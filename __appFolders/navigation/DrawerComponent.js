import React, {useContext, useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

//_________ Redux imports _________
import {useSelector, useDispatch} from 'react-redux';

import Colors from '../constants/Colors';
import {ThemeContext} from '../context/LayoutContext';

export default DrawerComponent = props => {
  const dispatch = useDispatch();
  const {navigation} = props;
  const {themeColors, theme, setTheme} = useContext(ThemeContext);

  const userProfile = useSelector(state => state.user);

  const [darkMode, setDarkMode] = useState(() => {
    theme === 'dark' ? true : false;
  });

  const activeColor = Colors.orange;
  const inactiveColor = Colors.white;

  const toggleTheme = () => {
    try {
      if (theme === 'dark') {
        setTheme('light');
        setDarkMode(false);
      } else {
        setTheme('dark');

        setDarkMode(true);
      }

      firestore()
        .collection('userObjects')
        .doc(userProfile.userID)
        .update({
          appTheme: theme === 'dark' ? 'light' : 'dark',
        });
    } catch (error) {
      console.log(error);
    }

    setDarkMode(!darkMode);
  };

  const styles = StyleSheet.create({
    drawerSection: {
      borderTopWidth: 1,
      borderTopColor: Colors.white,
      marginVertical: 20,
    },
    middleDrawerSection: {
      borderTopWidth: 1,
      borderTopColor: Colors.white,
      borderBottomWidth: 1,
      borderBottomColor: Colors.white,
      paddingBottom: 15,
      color: Colors.white,
    },
    bottonDrawerSection: {
      borderBottomWidth: 1,
      borderBottomColor: Colors.white,
      color: Colors.white,
    },

    userInfo: {marginHorizontal: 15},

    // drawerContent: {},
    // drawerItem: {},
    headerTitle: {
      color: Colors.white,
      fontSize: RFPercentage(2),
      fontWeight: 'bold',
      marginHorizontal: 15,
      marginVertical: 10,
    },
    paragraph: {
      color: Colors.white,
      fontSize: RFPercentage(1.5),
    },
    caption: {color: Colors.white, fontSize: RFPercentage(1.5)},
    themeSwitch: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginHorizontal: 15,
    },
    title: {
      color: Colors.white,
      fontSize: RFPercentage(2),
    },
    text: {
      color: Colors.white,
      fontSize: RFPercentage(2),
    },
  });

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView>
        <View style={styles.drawerContent}>
          <View style={styles.userInfo}>
            <Paragraph style={styles.title}>{userProfile.email}</Paragraph>
            <View style={{flexDirection: 'row'}}>
              <Paragraph style={styles.paragraph}>Total Accounts : </Paragraph>
              <Caption style={styles.caption}>2</Caption>
            </View>
          </View>
          <View style={styles.drawerSection}>
            <DrawerItem // Home
              style={styles.drawerItem}
              icon={({size, color}) => (
                <Ionicons name="md-home" color={color} size={size} />
              )}
              label="Home"
              inactiveTintColor={inactiveColor}
              activeTintColor={activeColor}
              onPress={() => {
                navigation.navigate('Main');
              }}
            />

            <DrawerItem // My Accounts
              style={styles.drawerItem}
              icon={({size, color}) => (
                <Ionicons name="wallet" color={color} size={size} />
              )}
              label="My Accounts"
              inactiveTintColor={inactiveColor}
              activeTintColor={activeColor}
              onPress={() => {
                navigation.navigate('My Accounts');
              }}
            />

            <DrawerItem // Recurring
              style={styles.drawerItem}
              icon={({size, color}) => (
                <Ionicons name="repeat" color={color} size={size} />
              )}
              label="Recurring"
              inactiveTintColor={inactiveColor}
              activeTintColor={activeColor}
              onPress={() => {
                navigation.navigate('Recurring');
              }}
            />

            <DrawerItem // Recently added
              style={styles.drawerItem}
              icon={({size, color}) => (
                <Ionicons
                  name="md-add-circle-sharp"
                  color={color}
                  size={size}
                />
              )}
              label="Recently Added"
              inactiveTintColor={inactiveColor}
              activeTintColor={activeColor}
              onPress={() => {
                navigation.navigate('Recently Added');
              }}
            />

            <DrawerItem // Recently deleted
              style={styles.drawerItem}
              icon={({size, color}) => (
                <Ionicons name="md-remove-circle" color={color} size={size} />
              )}
              label="Recently Deleted"
              inactiveTintColor={inactiveColor}
              activeTintColor={activeColor}
              onPress={() => {
                navigation.navigate('Recently Deleted');
              }}
            />
          </View>

          <Drawer.Section style={styles.middleDrawerSection}>
            <View>
              <Text style={styles.headerTitle}>Prefrence</Text>
              <DrawerItem // settings
                style={styles.drawerItem}
                icon={({size, color}) => (
                  <Ionicons name="settings" color={color} size={size} />
                )}
                label="Settings"
                inactiveTintColor={inactiveColor}
                activeTintColor={activeColor}
                onPress={() => {
                  navigation.navigate('Settings');
                }}
              />

              <TouchableRipple
                onPress={() => {
                  toggleTheme();
                }}>
                <View style={styles.themeSwitch}>
                  <Text style={styles.text}>
                    Dark Theme {darkMode ? 'ON' : 'OFF'}
                  </Text>
                  <Switch
                    value={darkMode}
                    color={darkMode ? Colors.black : Colors.orange}
                    onValueChange={() => {
                      toggleTheme();
                    }}
                  />
                </View>
              </TouchableRipple>
            </View>
          </Drawer.Section>
          <Drawer.Section // Sign Out Botton
            style={styles.bottonDrawerSection}>
            <DrawerItem
              style={styles.drawerItem}
              icon={({size, color}) => (
                <Ionicons name="md-exit-outline" color={color} size={size} />
              )}
              label="Sign Out"
              inactiveTintColor={inactiveColor}
              activeTintColor={activeColor}
              onPress={() => {
                Alert.alert('Cofirm Sign Out', 'Sign Out ??', [
                  {
                    text: 'Yes',
                    onPress: () => {
                      auth().signOut();
                    },
                  },
                  {text: 'No'},
                ]);
              }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      {/* 


       */}
    </View>
  );
};
