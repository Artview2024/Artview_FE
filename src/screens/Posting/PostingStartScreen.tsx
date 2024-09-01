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
        const response = await axios.get(
          'http://13.125.81.126/api/myReviews/all/10001',
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

  const handleRecordSelect = (id: number) => {
    setSelectedRecord(id);
  };

  const handleStartPosting = () => {
    if (selectedRecord !== null) {
      navigation.navigate('Posting', {recordId: selectedRecord});
    }
  };

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
