import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, ImageSourcePropType} from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import CommunityScreen from '../screens/CommunityScreen';
import ExhibitionsScreen from '../screens/ExhibitionsScreen';
import MyScreen from '../screens/MyScreen';

const HomeStrokeIcon: ImageSourcePropType = require('../assets/icons/home-stroke-icon.png');
const HomeFillIcon: ImageSourcePropType = require('../assets/icons/home-fill-icon.png');
const CommunityStrokeIcon: ImageSourcePropType = require('../assets/icons/community-stroke-icon.png');
const ExhibitionsStrokeIcon: ImageSourcePropType = require('../assets/icons/exhibitions-stroke-icon.png');
const MyStrokeIcon: ImageSourcePropType = require('../assets/icons/my-stroke-icon.png');

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          paddingBottom: 3,
          height: 56,
        },
        tabBarIcon: ({focused, color, size}) => {
          let iconName: ImageSourcePropType = HomeStrokeIcon;

          if (route.name === 'Home') {
            iconName = focused ? HomeFillIcon : HomeStrokeIcon;
          } else if (route.name === 'Community') {
            iconName = CommunityStrokeIcon;
          } else if (route.name === 'Exhibitions') {
            iconName = ExhibitionsStrokeIcon;
          } else if (route.name === 'My') {
            iconName = MyStrokeIcon;
          }

          return (
            <Image
              source={iconName}
              style={{
                width: size,
                height: size,
                tintColor: focused ? color : 'black',
              }}
            />
          );
        },
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{title: '홈', headerShown: false}}
      />
      <Tab.Screen
        name="Community"
        component={CommunityScreen}
        options={{title: '소통', headerShown: false}}
      />
      <Tab.Screen
        name="Exhibitions"
        component={ExhibitionsScreen}
        options={{title: '전시', headerShown: false}}
      />
      <Tab.Screen
        name="My"
        component={MyScreen}
        options={{title: 'MY', headerShown: false}}
      />
    </Tab.Navigator>
  );
}
