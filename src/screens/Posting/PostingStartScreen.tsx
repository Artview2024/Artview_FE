import React, {useState, useEffect} from 'react';
import {
  useNavigation,
  NavigationProp,
  useIsFocused,
} from '@react-navigation/native';
import customAxios from '../../services/customAxios';
import {StackParamList} from '../../navigator/StackParamList';
import Records from '../../components/Records';
import {View, Text} from 'react-native';
import GlobalStyle from '../../styles/GlobalStyle';
import Header from '../../components/My/Header';

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

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await customAxios.get(`/myReviews/all`);
        const myRecords = response.data.map((item: any) => ({
          id: item.myReviewsId,
          name: item.exhibitionName,
          date: item.visitedDate,
          image: {uri: item.imageUrl},
        }));
        setRecords(myRecords);
      } catch (error: any) {
        console.error('오류:', error.response.data);
        setRecords([]);
      }
    };
    fetchRecords();
  }, [isFocused]);

  // 레코드 선택할 때 호출
  const handleRecordSelect = (id: number) => {
    setSelectedRecord(id);
  };

  // 포스팅 시작 (레코드 선택 후)
  useEffect(() => {
    if (selectedRecord !== null) {
      navigation.navigate('Posting', {recordId: selectedRecord});
    }
  }, [selectedRecord]);

  return (
    <View style={[GlobalStyle.container, {flex: 1}]}>
      <Header title={'전시 선택'}></Header>
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
