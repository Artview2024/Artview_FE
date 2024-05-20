import React from 'react';
import {createStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import RecordingScreen from '../screens/RecordingScreen';
import RecordsScreen from '../screens/RecordsScreen';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Tabs"
          component={TabNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Records"
          component={RecordsScreen}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="Recording"
          component={RecordingScreen}
          options={{headerShown: true}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
