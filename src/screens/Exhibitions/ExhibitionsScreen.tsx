import React, {useRef} from 'react';
import {View, ScrollView} from 'react-native';
import Text from '../../components/Text';
import {useScrollToTop} from '@react-navigation/native';
import SearchIcon from '../../assets/icons/search-icon.svg';
import NotificationIcon from '../../assets/icons/notification-icon.svg';
import GlobalStyle from '../../styles/GlobalStyle';
import RecommendedExhibition from '../../components/Exhibitions/FlatListExhibitions';

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
          <SearchIcon width={24} height={24} style={{marginRight: 10}} />
          <NotificationIcon width={24} height={25} />
        </View>
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        style={{flex: 1}}
        ref={ref}>
        <RecommendedExhibition
          data={recommendedExhibitions}
          title={'추천전시'}
        />
        <RecommendedExhibition
          data={recommendedExhibitions}
          small={true}
          title={'진행 중인 전시'}
        />
        <RecommendedExhibition
          data={recommendedExhibitions}
          small={true}
          title={'진행 예정 전시'}
        />
      </ScrollView>
    </View>
  );
}
