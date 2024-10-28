import React, {useEffect, useRef, useState, useCallback} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import customAxios from '../../services/customAxios';
import Text from '../../components/Text';
import {useScrollToTop, useFocusEffect} from '@react-navigation/native';
import GlobalStyle from '../../styles/GlobalStyle';
import UserInfo from '../../components/My/UserInfo';
import Tabs from '../../components/My/Tabs';
import PostingList from '../../components/My/PostingList';
import ExhibitionList from '../../components/My/ExhibitionList';
import MyInterests from '../../components/My/MyInterests';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackParamList} from '../../navigator/StackParamList';

type MyScreenNavigationProp = StackNavigationProp<StackParamList, 'MyScreen'>;

interface MyScreenProps {
  navigation: MyScreenNavigationProp;
}

export default function MyScreen({navigation}: MyScreenProps) {
  const ref = useRef(null);
  const [activeTab, setActiveTab] = useState('게시물');
  const [userInfo, setUserInfo] = useState({
    following: '0',
    follower: '0',
    numberOfMyReviews: '0',
    userName: '',
    userImageUrl: '',
  });
  const [postings, setPostings] = useState([]);
  const [exhibitions, setExhibitions] = useState([]);
  const [interests, setInterests] = useState(['현대미술', '공예']);
  const [loading, setLoading] = useState(true);

  useScrollToTop(ref);

  useFocusEffect(
    useCallback(() => {
      setActiveTab('게시물');
    }, []),
  );

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
          userImageUrl: userInfoData.userImageUrl,
        });
        setLoading(false);
      } catch (error: any) {
        console.error(
          'Failed to fetch user info or total number:',
          error.response?.data,
        );
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  useEffect(() => {
    const fetchPostings = async () => {
      try {
        const response = await customAxios.get('/user/myPage/myReview');
        const data = response.data;
        const formattedPostings = data.map((item: any) => ({
          id: item.id,
          name: item.title,
          date: item.date,
          image: {uri: item.imageUrl},
        }));
        setPostings(formattedPostings);
      } catch (error) {
        console.error('Failed to fetch postings:', error);
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
      } catch (error: any) {
        console.error('Failed to fetch exhibitions:', error.response.data);
      }
    };

    fetchPostings();
    fetchExhibitions();
  }, []);

  if (loading) {
    return (
      <View style={GlobalStyle.container}>
        <Text>로딩 중...</Text>
      </View>
    );
  }

  return (
    <View style={[GlobalStyle.container]}>
      <ScrollView ref={ref}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
          }}>
          <Text style={GlobalStyle.header}>마이</Text>
        </View>
        <UserInfo
          following={userInfo.following}
          follower={userInfo.follower}
          enjoyed={userInfo.numberOfMyReviews}
          userName={userInfo.userName}
          userImageUrl={userInfo.userImageUrl}
          navigation={navigation}
        />

        <MyInterests interests={interests} />

        {/* 탭 */}
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === '게시물' ? (
          <PostingList postings={postings} />
        ) : (
          <ExhibitionList exhibitions={exhibitions} />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
