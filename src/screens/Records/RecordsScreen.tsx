import React, {useState, useEffect} from 'react';
import {
  useNavigation,
  NavigationProp,
  useIsFocused,
  useRoute,
  RouteProp,
} from '@react-navigation/native';
import customAxios from '../../services/customAxios';
import {StackParamList} from '../../navigator/StackParamList';
import Records from '../../components/Records';
import {View} from 'react-native';
import Text from '../../components/Text';
import GlobalStyle from '../../styles/GlobalStyle';
import Header from '../../components/My/Header';

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

export default function RecordsScreen() {
  const navigation = useNavigation<NavigationProp<StackParamList>>();
  const route = useRoute<RouteProp<StackParamList, 'Records'>>();
  const [myRecords, setMyRecords] = useState<Record[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<number | null>(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await customAxios.get('/myReviews/all');

        const transformedRecords = response.data.map((item: any) => ({
          id: item.myReviewsId,
          name: item.exhibitionName,
          date: item.visitedDate,
          mainImage: item.imageUrl,
        }));

        setMyRecords(transformedRecords);
      } catch (error: any) {
        console.error('Error:', error.response.data);
        setMyRecords([]);
      }
    };

    if (isFocused) {
      fetchRecords();
    }
  }, [isFocused]);

  const handleRecordSelect = (id: number) => {
    setSelectedRecord(id);
    const record = myRecords.find(record => record.id === id);
    if (record) {
      navigation.navigate('RecordDetail', {record});
    }
  };

  const handleBackAction = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={[GlobalStyle.container]}>
      <Header title="" onBackPress={handleBackAction} />
      {myRecords.length > 0 ? (
        <Records
          exhibitions={myRecords.map(record => ({
            id: record.id,
            name: record.name,
            date: record.date,
            image: {uri: record.mainImage},
          }))}
          selectedExhibition={selectedRecord}
          onExhibitionSelect={handleRecordSelect}
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
