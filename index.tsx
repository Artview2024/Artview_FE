import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {name as appName} from './app.json';
import React, {useEffect} from 'react';
import AppNavigator from './src/navigator/AppNavigator';
import 'react-native-reanimated';
import SplashScreen from 'react-native-splash-screen';
import Reactotron from 'reactotron-react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

if (__DEV__) {
  import('./ReactotronConfig').then(() =>
    Reactotron.log('Reactotron Configured'),
  );
}

// QueryClient 생성
const queryClient = new QueryClient();

const RootApp = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
};

AppRegistry.registerComponent(appName, () => RootApp);
