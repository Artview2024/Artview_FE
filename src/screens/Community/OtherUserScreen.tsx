import React, {useEffect, useRef, useState, useCallback} from 'react';
import {View, StyleSheet, ScrollView, RefreshControl} from 'react-native';
import customAxios from '../../services/customAxios';
import Text from '../../components/Text';
import {
  useScrollToTop,
  useFocusEffect,
  useRoute,
} from '@react-navigation/native';
import GlobalStyle from '../../styles/GlobalStyle';
import UserInfo from '../../components/My/UserInfo';
import Tabs from '../../components/My/Tabs';
import PostingList from '../../components/My/PostingList';
import ExhibitionList from '../../components/My/ExhibitionList';
import {StackParamList} from '../../navigator/StackParamList';
import {RouteProp} from '@react-navigation/native';
import useRefresh from '../../hooks/useRefresh';
import MyInterests from '../../components/My/MyInterests';
import Header from '../../components/My/Header';

type OtherUserProfileRouteProp = RouteProp<StackParamList, 'OtherUser'>;

const OtherUserScreen: React.FC = () => {
  const route = useRoute<OtherUserProfileRouteProp>();
  const {writerId} = route.params;

  const ref = useRef(null);
  const [activeTab, setActiveTab] = useState('게시물');
  const [userInfo, setUserInfo] = useState({
    userId: writerId,
    userName: '',
    userImageUrl: '',
    following: 0,
    follower: 0,
    numberOfMyReviews: 0,
  });
  const [postings, setPostings] = useState([]);
  const [exhibitions, setExhibitions] = useState([]);
  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  const refetch = async () => {
    setLoading(true);
    await fetchAllData();
    setLoading(false);
  };

  const {refreshing, onRefresh} = useRefresh(refetch);

  useScrollToTop(ref);

  const fetchUserInfo = async () => {
    try {
      const userResponse = await customAxios.get(`/user/userInfo/${writerId}`);
      const totalResponse = await customAxios.get(
        `/user/totalNumber/${writerId}`,
      );

      setUserInfo({
        ...userResponse.data,
        following: totalResponse.data.following.toString(),
        follower: totalResponse.data.follower.toString(),
        numberOfMyReviews: totalResponse.data.numberOfMyReviews.toString(),
      });

      const followResponse = await customAxios.get(
        `/user/checkFollow/${writerId}`,
      );
      setIsFollowing(followResponse.data);
    } catch (error: any) {
      console.error('Failed to fetch user data:', error.response?.data);
    }
  };

  const fetchPostings = async () => {
    try {
      const response = await customAxios.get(`/user/communication/${writerId}`);
      const data = response.data;
      const formattedPostings = data.map((item: any) => ({
        id: item.id,
        name: item.title,
        date: item.date,
        image: {uri: item.imageUrl},
      }));
      setPostings(formattedPostings);
    } catch (error: any) {
      console.error('Failed to fetch postings:', error.response?.data);
    }
  };

  const fetchExhibitions = async () => {
    try {
      const response = await customAxios.get(`/user/myReview/${writerId}`);
      const data = response.data;
      const formattedExhibitions = data.map((item: any) => ({
        id: item.id,
        title: item.title,
        date: item.date,
        gallery: item.gallery,
        image: {uri: item.imageUrl},
      }));
      setExhibitions(formattedExhibitions);
    } catch (error: any) {
      console.error('Failed to fetch exhibitions:', error.response?.data);
    }
  };

  const fetchAllData = async () => {
    setLoading(true);
    await fetchUserInfo();
    await fetchPostings();
    await fetchExhibitions();
    setLoading(false);
  };

  useEffect(() => {
    fetchAllData();
  }, [writerId]);

  useFocusEffect(
    useCallback(() => {
      fetchAllData();
    }, []),
  );

  if (loading) {
    return (
      <View style={GlobalStyle.container}>
        <Text>로딩 중...</Text>
      </View>
    );
  }

  return (
    <View style={[GlobalStyle.container]}>
      <ScrollView
        ref={ref}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
          }}></View>
        <Header title={''} />
        <UserInfo
          userId={writerId ?? 0}
          following={userInfo.following}
          follower={userInfo.follower}
          enjoyed={userInfo.numberOfMyReviews}
          userName={userInfo.userName}
          userImageUrl={userInfo.userImageUrl}
          isOtherUser={true}
          isFollowing={isFollowing}
          updateFollowingCount={newFollowing => setIsFollowing(newFollowing)}
        />

        <MyInterests interests={interests} />
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === '게시물' ? (
          <PostingList postings={postings} />
        ) : (
          <ExhibitionList exhibitions={exhibitions} />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginVertical: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});

export default OtherUserScreen;