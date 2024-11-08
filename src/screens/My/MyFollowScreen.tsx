import React, {useEffect, useState, useCallback} from 'react';
import {View, ScrollView} from 'react-native';
import {
  useRoute,
  RouteProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Header from '../../components/My/Header';
import Tabs2 from '../../components/My/Tabs2';
import FollowList from '../../components/My/FollowList';
import ExhibitionList from '../../components/My/ExhibitionList';
import customAxios from '../../services/customAxios';
import {StackParamList} from '../../navigator/StackParamList';
import GlobalStyle from '../../styles/GlobalStyle';
import Text from '../../components/Text';

type MyFollowScreenRouteProp = RouteProp<StackParamList, 'MyFollowScreen'>;
type NavigationProp = StackNavigationProp<StackParamList, 'MyFollowScreen'>;

const MyFollowScreen = () => {
  const route = useRoute<MyFollowScreenRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const {
    activeTab: initialTab,
    isOtherUser = false,
    userId,
  } = route.params || {activeTab: '팔로잉'};
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
  const [loading, setLoading] = useState(true);

  const fetchUserInfo = useCallback(async () => {
    try {
      const userEndpoint =
        isOtherUser && userId
          ? `/user/userInfo/${userId}`
          : '/user/myPage/userInfo';
      const totalEndpoint =
        isOtherUser && userId
          ? `/user/totalNumber/${userId}`
          : '/user/myPage/totalNumber';

      const [userInfoResponse, totalNumberResponse] = await Promise.all([
        customAxios.get(userEndpoint),
        customAxios.get(totalEndpoint),
      ]);

      setUserInfo({
        userName: userInfoResponse.data.userName,
        following: totalNumberResponse.data.following.toString(),
        follower: totalNumberResponse.data.follower.toString(),
        numberOfMyReviews:
          totalNumberResponse.data.numberOfMyReviews.toString(),
      });
    } catch (error: any) {
      console.error(
        'Failed to fetch user info or total number:',
        error.response?.data,
      );
    } finally {
      setLoading(false);
    }
  }, [isOtherUser, userId]);

  const fetchFollowList = useCallback(async () => {
    try {
      if (activeTab === '팔로잉') {
        const apiEndpoint =
          isOtherUser && userId
            ? `/user/FollowingList/${userId}`
            : '/user/myPage/myFollowingList';
        const response = await customAxios.get(apiEndpoint);
        const data = response.data.map((item: any) => ({
          id: item.userId,
          name: item.userName,
          imageUrl: item.userImageUrl,
          isFollowing: item.isFollowing,
        }));
        setFollowings(data);
      } else if (activeTab === '팔로워') {
        const apiEndpoint =
          isOtherUser && userId
            ? `/user/FollowerList/${userId}`
            : '/user/myPage/myFollowerList';
        const response = await customAxios.get(apiEndpoint);
        const data = response.data.map((item: any) => ({
          id: item.userId,
          name: item.userName,
          imageUrl: item.userImageUrl,
          isFollowing: item.isFollowing,
        }));
        setFollowers(data);
      } else if (activeTab === '기록') {
        const apiEndpoint =
          isOtherUser && userId
            ? `/user/myReview/${userId}`
            : '/user/myPage/myReview';
        const response = await customAxios.get(apiEndpoint);
        const data = response.data.map((item: any) => ({
          id: item.id,
          title: item.title,
          date: item.date,
          gallery: item.gallery,
          image: {uri: item.imageUrl},
        }));
        setExhibitions(data);
      }
    } catch (error: any) {
      console.error(
        'Failed to fetch follow list or exhibitions:',
        error.response?.data,
      );
    }
  }, [activeTab, isOtherUser, userId]);

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

  useFocusEffect(
    useCallback(() => {
      fetchFollowList();
    }, [fetchFollowList]),
  );

  const updateFollowingCount = (isFollowing: boolean) => {
    setUserInfo(prevInfo => ({
      ...prevInfo,
      following: isFollowing
        ? (parseInt(prevInfo.following) + 1).toString()
        : (parseInt(prevInfo.following) - 1).toString(),
    }));
  };

  if (loading) {
    return (
      <View style={GlobalStyle.container}>
        <Text>로딩 중...</Text>
      </View>
    );
  }

  return (
    <View style={[GlobalStyle.container]}>
      <Header
        title={userInfo.userName}
        onBackPress={() => navigation.goBack()}
      />
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
