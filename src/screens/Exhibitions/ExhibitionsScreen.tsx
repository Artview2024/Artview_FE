import React, {useRef, useEffect, useState} from 'react';
import {View, ScrollView, TouchableOpacity} from 'react-native';
import Text from '../../components/Text';
import {useScrollToTop} from '@react-navigation/native';
import SearchIcon from '../../assets/icons/search-icon.svg';
import NotificationIcon from '../../assets/icons/notification-icon.svg';
import GlobalStyle from '../../styles/GlobalStyle';
import FlatListExhibitions from '../../components/Exhibitions/FlatListExhibitions';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {StackParamList} from '../../navigator/StackParamList';
import customAxios from '../../services/customAxios';

const recommendedExhibitions = [
  {
    key: '1',
    title: 'SERIOUS',
    date: '2024.05.14~05.30',
    gallery: '성남 갤러리홀',
    image: require('../../assets/images/recommend1.png'),
  },
  {
    key: '2',
    title: '웨딩전',
    date: '2024.05.04~07.30',
    gallery: '갤러리',
    image: require('../../assets/images/recommend2.png'),
  },
  {
    key: '3',
    title: '웨딩전',
    date: '2024.05.04~07.30',
    gallery: '갤러리',
    image: require('../../assets/images/carousel1.png'),
  },
];

export default function ExhibitionsScreen() {
  const ref = useRef(null);
  useScrollToTop(ref);
  const navigation = useNavigation<NavigationProp<StackParamList>>();

  const [ongoingExhibitions, setOngoingExhibitions] = useState([]);
  const [upcomingExhibitions, setUpcomingExhibitions] = useState([]);

  useEffect(() => {
    fetchOngoingExhibitions();
    //fetchUpcomingExhibitions();
  }, []);

  const fetchOngoingExhibitions = async () => {
    try {
      const response = await customAxios.get(`/exhibition/ongoing/0`);
      const data = response.data.exhibitionInfos.map((item: any) => ({
        key: item.exhibitionId.toString(),
        title: item.title,
        date: `${item.startDate.split(' ')[0]} ~ ${
          item.finishDate.split(' ')[0]
        }`,
        gallery: item.location,
        image: {uri: item.mainImageUrl},
      }));
      setOngoingExhibitions(data);
    } catch (error: any) {
      console.error(
        'Failed to fetch ongoing exhibitions:',
        error.response?.data,
      );
    }
  };

  const fetchUpcomingExhibitions = async () => {
    try {
      const response = await customAxios.get(`/exhibition/upcoming/0`);
      const data = response.data.exhibitionInfos.map((item: any) => ({
        key: item.exhibitionId.toString(),
        title: item.title,
        date: `${item.startDate.split(' ')[0]} ~ ${
          item.finishDate.split(' ')[0]
        }`,
        gallery: item.location,
        image: {uri: item.mainImageUrl},
      }));
      setUpcomingExhibitions(data);
    } catch (error: any) {
      console.error(
        'Failed to fetch upcoming exhibitions:',
        error.response?.data,
      );
    }
  };

  return (
    <View style={GlobalStyle.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={GlobalStyle.header}>전시</Text>
        <View
          style={{flexDirection: 'row', alignItems: 'center', paddingTop: 10}}>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <SearchIcon width={24} height={24} style={{marginRight: 10}} />
          </TouchableOpacity>
          <NotificationIcon width={24} height={25} />
        </View>
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        style={{flex: 1}}
        ref={ref}>
        <FlatListExhibitions data={recommendedExhibitions} title={'추천전시'} />
        <FlatListExhibitions
          data={ongoingExhibitions}
          small={true}
          title={'진행 중인 전시'}
        />
        {/* <FlatListExhibitions
          data={upcomingExhibitions}
          small={true}
          title={'진행 예정 전시'}
        /> */}
      </ScrollView>
    </View>
  );
}
