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

export default function ExhibitionsScreen() {
  const ref = useRef(null);
  useScrollToTop(ref);
  const navigation = useNavigation<NavigationProp<StackParamList>>();

  const [ongoingExhibitions, setOngoingExhibitions] = useState([]);
  const [freeExhibitions, setFreeExhibitions] = useState([]);
  const [onlineExhibitions, setOnlineExhibitions] = useState([]);

  useEffect(() => {
    fetchExhibitions();
  }, []);

  const fetchExhibitions = async () => {
    try {
      const ongoingResponse = await customAxios.get('/exhibition/ongoing/0');
      if (ongoingResponse?.data?.exhibitionInfos) {
        const data = ongoingResponse.data.exhibitionInfos.map((item: any) => ({
          key: item.exhibitionId.toString(),
          title: item.title,
          date: `${item.startDate.split(' ')[0]} ~ ${
            item.finishDate.split(' ')[0]
          }`,
          gallery: item.location,
          image: {uri: item.mainImageUrl},
          exhibitionId: Number(item.exhibitionId),
        }));
        setOngoingExhibitions(data);
      }

      const freeResponse = await customAxios.get('/exhibition/free/0');
      if (freeResponse?.data?.exhibitionInfos) {
        const data = freeResponse.data.exhibitionInfos.map((item: any) => ({
          key: item.exhibitionId.toString(),
          title: item.title,
          date: `${item.startDate.split(' ')[0]} ~ ${
            item.finishDate.split(' ')[0]
          }`,
          gallery: item.location,
          image: {uri: item.mainImageUrl},
          exhibitionId: Number(item.exhibitionId),
        }));
        setFreeExhibitions(data);
      }

      const onlineResponse = await customAxios.get('/exhibition/online/0');
      if (onlineResponse?.data?.exhibitionInfos) {
        const data = onlineResponse.data.exhibitionInfos.map((item: any) => ({
          key: item.exhibitionId.toString(),
          title: item.title,
          date: `${item.startDate.split(' ')[0]} ~ ${
            item.finishDate.split(' ')[0]
          }`,
          gallery: item.location,
          image: {uri: item.mainImageUrl},
          exhibitionId: Number(item.exhibitionId),
        }));
        setOnlineExhibitions(data);
      }
    } catch (error: any) {
      console.error('Failed to fetch exhibitions:', error);
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
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Search', {searchType: 'exhibition'})
            }>
            <SearchIcon width={24} height={24} style={{marginRight: 10}} />
          </TouchableOpacity>
          <NotificationIcon width={24} height={25} />
        </View>
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        style={{flex: 1}}
        ref={ref}>
        <FlatListExhibitions
          data={ongoingExhibitions}
          title={'진행 중인 전시'}
          onPress={item =>
            navigation.navigate('ExhibitionDetail', {
              exhibitionId: item.exhibitionId,
              isOnlineExhibition: false,
            })
          }
        />
        <FlatListExhibitions
          data={freeExhibitions}
          small={true}
          title={'무료 전시'}
          onPress={item =>
            navigation.navigate('ExhibitionDetail', {
              exhibitionId: item.exhibitionId,
              isOnlineExhibition: false,
            })
          }
        />
        <FlatListExhibitions
          data={onlineExhibitions}
          small={true}
          title={'온라인 전시'}
          onPress={item =>
            navigation.navigate('ExhibitionDetail', {
              exhibitionId: item.exhibitionId,
              isOnlineExhibition: true,
            })
          }
        />
      </ScrollView>
    </View>
  );
}
