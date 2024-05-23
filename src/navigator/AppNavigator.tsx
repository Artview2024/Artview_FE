import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import RecordingScreen from '../screens/RecordingScreen';
import RecordsScreen from '../screens/RecordsScreen';

export type StackParamList = {
  Tabs: undefined;
  Records: undefined;
  Recording: undefined;
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
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="Recording"
        component={RecordingScreen}
        options={{headerShown: true}}
      />
    </Stack.Navigator>
  );
}
