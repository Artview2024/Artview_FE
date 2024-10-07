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

  const mockFollowings = [
    {id: 1, name: '사용자1'},
    {id: 2, name: '사용자2'},
  ];

  const mockFollowers = [
    {id: 3, name: '사용자3'},
    {id: 4, name: '사용자4'},
  ];

  const [exhibitions, setExhibitions] = useState([]);

  useEffect(() => {
    if (activeTab === '관람') {
      fetchExhibitions();
    }
  }, [activeTab]);

  const fetchExhibitions = async () => {
    try {
      const response = await customAxios.get('/user/myPage/communication'); // MyScreen과 동일한 API 호출
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

  return (
    <View style={[GlobalStyle.container]}>
      <Header title="김민주" />
      <Tabs2 activeTab={activeTab} setActiveTab={setActiveTab} />
      <ScrollView>
        {activeTab === '팔로잉' && <FollowList followList={mockFollowings} />}
        {activeTab === '팔로워' && <FollowList followList={mockFollowers} />}
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
