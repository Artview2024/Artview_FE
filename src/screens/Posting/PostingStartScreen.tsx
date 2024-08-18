import React, {useState, useEffect} from 'react';
import {
  useNavigation,
  NavigationProp,
  useIsFocused,
} from '@react-navigation/native';
import axios from 'axios';
import {StackParamList} from '../../navigator/StackParamList';
import Records from '../../components/Records';
import {View, Text} from 'react-native';

const mockRecords = [
  {
    id: 1,
    name: '이경준 사진전',
    date: '2023.12.18',
    gallery: '서울미술관',
    image: require('../../assets/images/artList3.jpg'),
  },
  {
    id: 2,
    name: '인상주의의 출현',
    date: '2023.11.11',
    gallery: '서울미술관',
    image: require('../../assets/images/carousel4.jpg'),
  },
  {
    id: 3,
    name: '2021 SF:오디세이 서울',
    date: '2022.10.28',
    gallery: '서울미술관',
    image: require('../../assets/images/carousel7.jpg'),
  },
];

export default function PostingStartScreen() {
  const navigation = useNavigation<NavigationProp<StackParamList>>();
  const [records, setRecords] = useState<any[]>(mockRecords); // 일단 초기값은 목데이터(추후변경)
  const [selectedRecord, setSelectedRecord] = useState<number | null>(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get(
          'http://13.125.81.126/api/communications',
        );
        const myRecords = response.data.map((item: any) => ({
          id: item.myReviewsId,
          name: item.exhibitionName,
          date: item.visitedDate,
          mainImage: item.imageUrl,
        }));
        console.log('Server Response:', response.data);
        setRecords(myRecords);
      } catch (error) {
        console.error('오류:', error);
        setRecords(mockRecords);
      }
    };

    fetchRecords();
  }, [isFocused]);

  const handleRecordSelect = (id: number) => {
    setSelectedRecord(id);
  };

  const handleStartPosting = () => {
    if (selectedRecord !== null) {
      navigation.navigate('Posting', {recordId: selectedRecord});
    }
  };

  //글쓰기할 기록을 선택하라는 문구 필요할 것 같음 >> 기획 및 디자인 수정 필요
  return (
    <View style={{flex: 1}}>
      {records.length > 0 ? (
        <Records
          exhibitions={records}
          selectedExhibition={selectedRecord}
          onExhibitionSelect={handleRecordSelect}
          onStart={handleStartPosting}
          backAction={() => navigation.goBack()}
        />
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>내 기록을 불러오고 있습니다</Text>
        </View>
      )}
    </View>
  );
}
