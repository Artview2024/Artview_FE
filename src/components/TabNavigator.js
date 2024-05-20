import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import CommunityScreen from '../screens/CommunityScreen';
import ExhibitionsScreen from '../screens/ExhibitionsScreen';
import MyScreen from '../screens/MyScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          paddingBottom: 3,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: '홈',
          tabBarActiveTintColor: '#000000',
        }}
      />
      <Tab.Screen
        name="Community"
        component={CommunityScreen}
        options={{
          title: '소통',
          tabBarActiveTintColor: '#000000',
        }}
      />
      <Tab.Screen
        name="Exhibitions"
        component={ExhibitionsScreen}
        options={{
          title: '전시',
          tabBarActiveTintColor: '#000000',
        }}
      />
      <Tab.Screen
        name="My"
        component={MyScreen}
        options={{
          title: 'MY',
          tabBarActiveTintColor: '#000000',
        }}
      />
    </Tab.Navigator>
  );
}
