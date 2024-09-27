import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, ImageSourcePropType, Text} from 'react-native'; // Text 가져오기
import HomeScreen from '../screens/HomeScreen';
import CommunityScreen from '../screens/Community/CommunityScreen';
import ExhibitionsScreen from '../screens/ExhibitionsScreen';
import MyScreen from '../screens/MyScreen';

const HomeStrokeIcon: ImageSourcePropType = require('../assets/icons/home-stroke-icon.png');
const HomeFillIcon: ImageSourcePropType = require('../assets/icons/home-fill-icon.png');
const CommunityStrokeIcon: ImageSourcePropType = require('../assets/icons/community-stroke-icon.png');
const CommunityFillIcon: ImageSourcePropType = require('../assets/icons/community-fill-icon.png');
const ExhibitionsStrokeIcon: ImageSourcePropType = require('../assets/icons/exhibitions-stroke-icon.png');
const ExhibitionsFillIcon: ImageSourcePropType = require('../assets/icons/exhibitions-fill-icon.png');
const MyStrokeIcon: ImageSourcePropType = require('../assets/icons/my-stroke-icon.png');
const MyFillIcon: ImageSourcePropType = require('../assets/icons/my-fill-icon.png');
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
            iconName = focused ? CommunityFillIcon : CommunityStrokeIcon;
          } else if (route.name === 'Exhibitions') {
            iconName = focused ? ExhibitionsFillIcon : ExhibitionsStrokeIcon;
          } else if (route.name === 'My') {
            iconName = focused ? MyFillIcon : MyStrokeIcon;
          }

          return (
            <Image
              source={iconName}
              style={{
                width: size,
                height: size,
                tintColor: focused ? color : 'gray',
              }}
            />
          );
        },
        tabBarLabel: ({focused, color}) => {
          let label = '';

          if (route.name === 'Home') {
            label = '홈';
          } else if (route.name === 'Community') {
            label = '소통';
          } else if (route.name === 'Exhibitions') {
            label = '전시';
          } else if (route.name === 'My') {
            label = 'MY';
          }

          return (
            <Text
              allowFontScaling={false}
              style={{
                color: focused ? color : 'gray',
                fontSize: 12,
                paddingRight: 2,
              }}>
              {label}
            </Text>
          );
        },
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Community"
        component={CommunityScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Exhibitions"
        component={ExhibitionsScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="My"
        component={MyScreen}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
}
