import React from 'react';
import 'react-native-gesture-handler';
import {View, Text} from 'react-native';
import LayoutContext from './__appFolders/context/LayoutContext';
import MainStackNavigator from './__appFolders/navigation/MainStackNavigator';
import configureStore from './__appFolders/store/configStore';
import {Provider as ReduxProvider} from 'react-redux';

const store = configureStore();

export default App = () => {
  return (
    <ReduxProvider store={store}>
      <LayoutContext>
        <MainStackNavigator />
      </LayoutContext>
    </ReduxProvider>
  );
};
