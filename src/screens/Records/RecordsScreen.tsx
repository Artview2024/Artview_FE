import React, {useState, useEffect} from 'react';
import {
  useNavigation,
  NavigationProp,
  useIsFocused,
  useRoute,
  RouteProp,
} from '@react-navigation/native';
import axios from 'axios';
import {StackParamList} from '../../navigator/StackParamList';
import Records from '../../components/Records';
import GlobalStyle from '../../styles/GlobalStyle';
import {View, Text} from 'react-native';

type Record = {
  id: number;
  name: string;
  date: string;
  mainImage: string;
  gallery: string;
  rating: string;
  artList: Array<{
    image: string;
    title: string;
    artist: string;
    memo: string;
  }>;
};

type Exhibition = {
  id: number;
  name: string;
  date: string;
  image: {uri: string};
};

export default function RecordsScreen() {
  const navigation = useNavigation<NavigationProp<StackParamList>>();
  const route = useRoute<RouteProp<StackParamList, 'Records'>>();
  const [myRecords, setMyRecords] = useState<Record[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<number | null>(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get(
          `http://13.125.81.126/api/myReviews/all/10001`,
          {
            headers: {
              Accept: 'application/json',
              Authorization: `Bearer ACCESS_TOKEN`,
            },
          },
        );
        console.log('Server Response:', response.data);

        const transformedRecords = response.data.map((item: any) => ({
          id: item.myReviewsId,
          name: item.exhibitionName,
          date: item.visitedDate,
          mainImage: item.imageUrl,
        }));

        setMyRecords(transformedRecords);
      } catch (error) {
        console.error('Error:', error);
        setMyRecords([]);
      }
    };

    fetchRecords();
  }, [isFocused]);

  const handleRecordSelect = (id: number) => {
    setSelectedRecord(id);
  };

  const handleStartViewing = () => {
    if (selectedRecord !== null) {
      const record = myRecords.find(record => record.id === selectedRecord);
      if (record) {
        navigation.navigate('RecordDetail', {record});
      }
    }
  };

  const handleBackAction = () => {
    navigation.navigate('Home');
  };

  const exhibitions: Exhibition[] = myRecords.map(record => ({
    id: record.id,
    name: record.name,
    date: record.date,
    image: {uri: record.mainImage},
  }));

  return (
    <View style={[GlobalStyle.container]}>
      {myRecords.length > 0 ? (
        <Records
          exhibitions={exhibitions}
          selectedExhibition={selectedRecord}
          onExhibitionSelect={id => {
            handleRecordSelect(id);
            handleStartViewing();
          }}
          onStart={handleStartViewing}
          backAction={handleBackAction}
        />
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>내 기록을 불러오고 있습니다</Text>
        </View>
      )}
    </View>
  );
}
