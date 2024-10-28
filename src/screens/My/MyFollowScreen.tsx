// MyFollowScreen.tsx

import React, {useState, useEffect} from 'react';
import {View, ScrollView} from 'react-native';
import {useRoute, RouteProp} from '@react-navigation/native';
import Header from '../../components/My/Header';
import Tabs2 from '../../components/My/Tabs2';
import FollowList from '../../components/My/FollowList';
import ExhibitionList from '../../components/My/ExhibitionList';
import customAxios from '../../services/customAxios';
import {StackParamList} from '../../navigator/StackParamList';
import GlobalStyle from '../../styles/GlobalStyle';

type MyFollowScreenRouteProp = RouteProp<StackParamList, 'MyFollowScreen'>;

const MyFollowScreen = () => {
  const route = useRoute<MyFollowScreenRouteProp>();
  const {activeTab: initialTab} = route.params || {activeTab: '팔로잉'};
  const [activeTab, setActiveTab] = useState(initialTab);

  const [userInfo, setUserInfo] = useState({
    following: '0',
    follower: '0',
    numberOfMyReviews: '0',
    userName: '',
  });
  const [followings, setFollowings] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [exhibitions, setExhibitions] = useState([]);

  useEffect(() => {
    if (activeTab === '팔로잉') {
      fetchFollowingList();
    } else if (activeTab === '팔로워') {
      fetchFollowerList();
    } else if (activeTab === '관람') {
      fetchExhibitions();
    }
  }, [activeTab]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfoResponse = await customAxios.get('/user/myPage/userInfo');
        const userInfoData = userInfoResponse.data;
        const totalNumberResponse = await customAxios.get(
          '/user/myPage/totalNumber',
        );
        const totalNumberData = totalNumberResponse.data;

        setUserInfo({
          following: totalNumberData.following.toString(),
          follower: totalNumberData.follower.toString(),
          numberOfMyReviews: totalNumberData.numberOfMyReviews.toString(),
          userName: userInfoData.userName,
        });
      } catch (error: any) {
        console.error(
          'Failed to fetch user info or total number:',
          error.response?.data,
        );
      }
    };

    fetchUserInfo();
  }, []);

  const fetchFollowingList = async () => {
    try {
      const response = await customAxios.get('/user/myPage/myFollowingList');
      const data = response.data.followInfoList.map((item: any) => ({
        id: item.userId,
        name: item.userName,
        imageUrl: item.userImageUrl,
        isFollowing: true,
      }));
      setFollowings(data);
    } catch (error) {
      console.error('Failed to fetch following list:', error);
    }
  };

  const fetchFollowerList = async () => {
    try {
      const response = await customAxios.get('/user/myPage/myFollowerList');
      const data = response.data.followInfoList.map((item: any) => ({
        id: item.userId,
        name: item.userName,
        imageUrl: item.userImageUrl,
        isFollowing: false,
      }));
      setFollowers(data);
    } catch (error) {
      console.error('Failed to fetch follower list:', error);
    }
  };

  const fetchExhibitions = async () => {
    try {
      const response = await customAxios.get('/user/myPage/communication');
      const data = response.data;
      const formattedExhibitions = data.map((item: any) => ({
        id: item.id,
        title: item.title,
        date: item.date,
        gallery: item.gallery,
        image: {uri: item.imageUrl},
      }));
      setExhibitions(formattedExhibitions);
    } catch (error) {
      console.error('Failed to fetch Exhibitions:', error);
    }
  };

  return (
    <View style={[GlobalStyle.container]}>
      <Header title={userInfo.userName} />
      <Tabs2
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        following={userInfo.following}
        follower={userInfo.follower}
        numberOfMyReviews={userInfo.numberOfMyReviews}
      />
      <ScrollView>
        {activeTab === '팔로잉' && (
          <FollowList followList={followings} activeTab={activeTab} />
        )}
        {activeTab === '팔로워' && (
          <FollowList followList={followers} activeTab={activeTab} />
        )}
        {activeTab === '관람' && (
          <View style={{paddingTop: 20}}>
            <ExhibitionList exhibitions={exhibitions} />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default MyFollowScreen;
