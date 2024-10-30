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
    // 초기 탭 설정
    console.log('Initial Tab:', initialTab);
    setActiveTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    if (activeTab === '팔로잉') {
      fetchFollowingList();
    } else if (activeTab === '팔로워') {
      fetchFollowerList();
    } else if (activeTab === '기록') {
      fetchExhibitions();
    }
  }, [activeTab]);

  useEffect(() => {
    fetchUserInfo();
  }, []);

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
      console.log('User Info:', userInfoData);
    } catch (error: any) {
      console.error(
        'Failed to fetch user info or total number:',
        error.response?.data,
      );
    }
  };

  const fetchFollowingList = async () => {
    try {
      const response = await customAxios.get('/user/myPage/myFollowingList');
      const data =
        response.data?.map((item: any) => ({
          id: item.userId,
          name: item.userName,
          imageUrl: item.userImageUrl,
          isFollowing: item.isFollowing,
        })) || [];
      setFollowings(data);
      console.log('Following list:', data);
    } catch (error: any) {
      console.error('Failed to fetch following list:', error.response?.data);
    }
  };

  const fetchFollowerList = async () => {
    try {
      const response = await customAxios.get('/user/myPage/myFollowerList');
      const data =
        response.data?.map((item: any) => ({
          id: item.userId,
          name: item.userName,
          imageUrl: item.userImageUrl,
          isFollowing: item.isFollowing,
        })) || [];
      setFollowers(data);
      console.log('Follower list:', data);
    } catch (error: any) {
      console.error('Failed to fetch follower list:', error.response?.data);
    }
  };

  const fetchExhibitions = async () => {
    try {
      console.log('Fetching exhibitions...');
      const response = await customAxios.get('/user/myPage/myReview');
      const data = response.data;
      const formattedExhibitions = data.map((item: any) => ({
        id: item.id,
        title: item.title,
        date: item.date,
        gallery: item.gallery,
        image: {uri: item.imageUrl},
      }));
      setExhibitions(formattedExhibitions);
      console.log('Exhibitions data:', formattedExhibitions);

      console.log('Exhibitions state in MyFollowScreen:', exhibitions);
    } catch (error: any) {
      console.error('Failed to fetch exhibitions:', error.response?.data);
    }
  };

  const updateFollowingCount = (isFollowing: boolean) => {
    setUserInfo(prevInfo => ({
      ...prevInfo,
      following: isFollowing
        ? (parseInt(prevInfo.following) + 1).toString()
        : (parseInt(prevInfo.following) - 1).toString(),
    }));
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
        {(activeTab === '팔로잉' || activeTab === '팔로워') && (
          <FollowList
            followList={activeTab === '팔로잉' ? followings : followers}
            activeTab={activeTab}
            updateFollowingCount={updateFollowingCount}
          />
        )}
        {activeTab === '기록' && (
          <View style={{paddingTop: 20}}>
            <ExhibitionList exhibitions={exhibitions} />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default MyFollowScreen;
