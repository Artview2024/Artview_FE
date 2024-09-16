import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {name as appName} from './app.json';
import React, {useEffect} from 'react';
import AppNavigator from './src/navigator/AppNavigator';
import 'react-native-reanimated';
import SplashScreen from 'react-native-splash-screen'; // 추가
import Reactotron from 'reactotron-react-native';

if (__DEV__) {
  import('./ReactotronConfig').then(() =>
    Reactotron.log('Reactotron Configured'),
  );
}

const RootApp = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

AppRegistry.registerComponent(appName, () => RootApp);
