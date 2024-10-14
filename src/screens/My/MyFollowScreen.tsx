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
    enjoyed: '0',
    userName: '',
  });

  useEffect(() => {
    fetchUserInfo();
  }, []);

  useEffect(() => {
    if (activeTab === '관람') {
      fetchExhibitions();
    }
  }, [activeTab]);

  const fetchUserInfo = async () => {
    try {
      const response = await customAxios.get('/user/myPage/userInfo');
      const data = response.data;
      setUserInfo({
        following: data.followees.toString(),
        follower: data.follower.toString(),
        enjoyed: data.numberOfMyReviews.toString(),
        userName: data.userName,
      });
    } catch (error) {
      console.error('Failed to fetch user info:', error);
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
        image: {uri: item.imageUrl},
      }));
      setExhibitions(formattedExhibitions);
    } catch (error) {
      console.error('Failed to fetch Exhibitions:', error);
    }
  };

  const mockFollowings = [
    {id: 1, name: '사용자1', isFollowing: true},
    {id: 2, name: '사용자2', isFollowing: true},
  ];

  const mockFollowers = [
    {id: 3, name: '사용자3', isFollowing: false},
    {id: 4, name: '사용자4', isFollowing: false},
  ];

  const [exhibitions, setExhibitions] = useState([]);

  return (
    <View style={[GlobalStyle.container]}>
      <Header title={userInfo.userName} />
      <Tabs2
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        following={userInfo.following}
        follower={userInfo.follower}
        enjoyed={userInfo.enjoyed}
      />
      <ScrollView>
        {activeTab === '팔로잉' && (
          <FollowList followList={mockFollowings} activeTab={activeTab} />
        )}
        {activeTab === '팔로워' && (
          <FollowList followList={mockFollowers} activeTab={activeTab} />
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
