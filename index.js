import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {name as appName} from './app.json';
import React from 'react';
import AppNavigator from './src/components/AppNavigator';

const RootApp = () => {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

AppRegistry.registerComponent(appName, () => RootApp);
