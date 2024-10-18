import React, {useRef, useState} from 'react';
import {View, ScrollView} from 'react-native';
import {useScrollToTop, useRoute, RouteProp} from '@react-navigation/native';
import Header from '../../components/My/Header';
import GlobalStyle from '../../styles/GlobalStyle';
import ExhibitionList from '../../components/My/ExhibitionList';
import Records from '../../components/Records';
import {StackParamList} from '../../navigator/StackParamList';

type ExhibitionsScreenRouteProp = RouteProp<StackParamList, 'ExhibitionsAll'>;

const recommendedExhibitions = [
  {
    id: 1,
    title: 'SERIOUS',
    name: 'SERIOUS',
    date: '2024.05.14~05.30',
    gallery: '성남 갤러리홀',
    image: require('../../assets/images/recommend1.png'),
  },
  {
    id: 2,
    title: '웨딩전',
    name: 'SERIOUS',
    date: '2024.05.04~07.30',
    gallery: '갤러리',
    image: require('../../assets/images/recommend2.png'),
  },
  {
    id: 3,
    title: '웨딩전',
    name: 'SERIOUS',
    date: '2024.05.04~07.30',
    gallery: '갤러리',
    image: require('../../assets/images/carousel1.png'),
  },
];

export default function ExhibitionsAllScreen() {
  const route = useRoute<ExhibitionsScreenRouteProp>();
  const ref = useRef(null);
  const [selectedExhibition, setSelectedExhibition] = useState<number | null>(
    null,
  );
  useScrollToTop(ref);

  const handleExhibitionSelect = (id: number) => {
    setSelectedExhibition(id);
  };

  return (
    <View style={GlobalStyle.container}>
      <Header title={route.params.title || '추천전시'} />
      {route.params.title !== '진행 예정 전시' ? (
        <Records
          exhibitions={recommendedExhibitions}
          selectedExhibition={selectedExhibition}
          onExhibitionSelect={handleExhibitionSelect}
          backAction={() => {}}
          showGallery={true}
        />
      ) : (
        <ScrollView>
          <ExhibitionList exhibitions={recommendedExhibitions} />
        </ScrollView>
      )}
    </View>
  );
}
