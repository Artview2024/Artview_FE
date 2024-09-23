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
import GlobalStyle from '../../styles/GlobalStyle';
import {API_BASE_URL} from '@env';

type Record = {
  id: number;
  name: string;
  date: string;
  image: {uri: string};
};

export default function PostingStartScreen() {
  const navigation = useNavigation<NavigationProp<StackParamList>>();
  const [records, setRecords] = useState<Record[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<number | null>(null);
  const isFocused = useIsFocused();

  // 내 기록을 API에서 가져오기
  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/myReviews/all/10001`,
          {
            headers: {
              Accept: 'application/json',
              Authorization: `Bearer ACCESS_TOKEN`,
            },
          },
        );

        const myRecords = response.data.map((item: any) => ({
          id: item.myReviewsId,
          name: item.exhibitionName,
          date: item.visitedDate,
          image: {uri: item.imageUrl},
        }));
        console.log('Server Response:', response.data);
        setRecords(myRecords);
      } catch (error) {
        console.error('오류:', error);
        setRecords([]);
      }
    };
    fetchRecords();
  }, [isFocused]);

  // 레코드 선택할 때 호출
  const handleRecordSelect = (id: number) => {
    console.log('Record selected:', id);
    setSelectedRecord(id);
  };

  // 포스팅 시작 (레코드 선택 후)
  useEffect(() => {
    if (selectedRecord !== null) {
      console.log('선택 record recordId:', selectedRecord);
      navigation.navigate('Posting', {recordId: selectedRecord});
    }
  }, [selectedRecord]);

  return (
    <View style={{flex: 1}}>
      {records.length > 0 ? (
        <Records
          exhibitions={records}
          selectedExhibition={selectedRecord}
          onExhibitionSelect={handleRecordSelect}
          backAction={() => navigation.goBack()}
        />
      ) : (
        <View
          style={[
            GlobalStyle.container,
            {justifyContent: 'center', alignItems: 'center'},
          ]}>
          <Text>내 기록을 불러오고 있습니다</Text>
        </View>
      )}
    </View>
  );
}
