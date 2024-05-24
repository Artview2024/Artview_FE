import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import RecordingStartScreen from '../screens/RecordingStartScreen';
import RecordingScreen from '../screens/RecordingScreen';
import RecordsScreen from '../screens/RecordsScreen';

export type StackParamList = {
  Tabs: undefined;
  Records: undefined;
  Recording: undefined;
  RecordingStart: undefined; // Add this line
};

const Stack = createNativeStackNavigator<StackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={TabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Records"
        component={RecordsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RecordingStart"
        component={RecordingStartScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Recording"
        component={RecordingScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
