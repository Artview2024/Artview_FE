import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import {
  useNavigation,
  NavigationProp,
  useIsFocused,
  useRoute,
  RouteProp,
} from '@react-navigation/native';
import axios from 'axios';
import {StackParamList} from '../navigator/StackParamList';
import BackIcon from 'react-native-vector-icons/Ionicons';
import GlobalStyle from '../styles/GlobalStyle';

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
        const response = await axios.get(
          `http://13.125.81.126/api/myReviews/all/1`,
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
      }
    };

    fetchRecords();
  }, [isFocused]);

  useEffect(() => {
    console.log('Current Records:', myRecords);
  }, [myRecords]);

  const handleRecordSelect = (id: number) => {
    setSelectedRecord(id);
    handleStartViewing(id);
  };

  const handleStartViewing = (id: number) => {
    const record = myRecords.find(record => record.id === id);
    if (record) {
      navigation.navigate('RecordDetail', {record});
    }
  };

  return (
    <View style={[GlobalStyle.container]}>
      <ScrollView>
        <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <BackIcon
              name="chevron-back"
              size={24}
              color={'black'}
              style={{paddingRight: 3, paddingTop: 18, paddingLeft: 0}}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.exhibitionList}>
          {myRecords.map(record => (
            <View key={record.id} style={styles.exhibitionWrapper}>
              <TouchableOpacity onPress={() => handleRecordSelect(record.id)}>
                <Image
                  source={{uri: record.mainImage}}
                  style={[
                    styles.exhibitionImage,
                    selectedRecord === record.id &&
                      styles.selectedExhibitionImage,
                  ]}
                />
                <View style={{paddingTop: 7}}>
                  <Text style={GlobalStyle.mainText}>{record.name}</Text>
                  <Text style={GlobalStyle.subText}>{record.date}</Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  exhibitionList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  exhibitionWrapper: {
    width: '48%',
    paddingTop: 10,
    marginVertical: 10,
  },
  exhibitionImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 3 / 4,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  selectedExhibitionImage: {
    opacity: 0.6,
  },
});
