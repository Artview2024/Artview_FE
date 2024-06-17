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
import {StackParamList} from '../navigator/StackParamList';
import BackIcon from 'react-native-vector-icons/Ionicons';
import GlobalStyle from '../styles/GlobalStyle';

const initialRecords = [
  {
    id: 1,
    name: '김민형 사진전',
    date: '2023.12.18',
    gallery: '서울미술관',
    mainImage: require('../assets/images/carousel4.jpg'),
    rating: '4.5',
    artList: [
      {
        image: require('../assets/images/carousel4.jpg'),
        title: '뉴욕거리',
        artist: '김민형',
        memo: '좋다. 멋있고 짱이다.',
      },
      {
        image: require('../assets/images/carousel6.jpg'),
        title: '뉴욕거리',
        artist: '김민형',
        memo: '무슨 소린지 모르겠다. ',
      },
      {
        image: require('../assets/images/carousel7.jpg'),
        title: '뉴욕거리',
        artist: '김민형',
        memo: '강렬한 색채',
      },
    ],
  },
  {
    id: 2,
    name: '모던',
    date: '2023.11.11',
    gallery: '서울미술관',
    mainImage: require('../assets/images/carousel5.jpg'),
    rating: '4.5',
    artList: [
      {
        image: require('../assets/images/carousel5.jpg'),
        title: '뉴욕거리',
        artist: '김민형',
        memo: '좋다. ',
      },
      {
        image: require('../assets/images/carousel4.jpg'),
        title: '뉴욕거리',
        artist: '김민형',
        memo: '좋다. ',
      },
      {
        image: require('../assets/images/carousel6.jpg'),
        title: '뉴욕거리',
        artist: '김민형',
        memo: '좋다. ',
      },
    ],
  },
  {
    id: 3,
    name: '끝없는 계단',
    date: '2022.10.28',
    gallery: '서울미술관',
    mainImage: require('../assets/images/carousel6.jpg'),
    rating: '4.5',
    artList: [
      {
        image: require('../assets/images/carousel6.jpg'),
        title: '뉴욕거리',
        artist: '김민형',
        memo: '좋다. ',
      },
      {
        image: require('../assets/images/carousel7.jpg'),
        title: '뉴욕거리',
        artist: '김민형',
        memo: '좋다. ',
      },
      {
        image: require('../assets/images/carousel4.jpg'),
        title: '뉴욕거리',
        artist: '김민형',
        memo: '좋다. ',
      },
    ],
  },
];

export default function RecordsScreen() {
  const navigation = useNavigation<NavigationProp<StackParamList>>();
  const route = useRoute<RouteProp<StackParamList, 'Records'>>();
  const [myRecords, setMyRecords] = useState(initialRecords);
  const [selectedRecord, setSelectedRecord] = useState<number | null>(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      const newRecord = route.params?.newRecord;
      if (newRecord) {
        // 새로운 기록의 ID를 추가합니다
        newRecord.id = myRecords.length + 1;
        // 기존 기록에 새로운 기록을 추가합니다
        setMyRecords(prevRecords => [...prevRecords, newRecord]);
      }
    }
  }, [isFocused, route.params]);

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
                  source={record.mainImage}
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
