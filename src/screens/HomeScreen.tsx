import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  useNavigation,
  NavigationProp,
  useScrollToTop,
} from '@react-navigation/native';
import Text from '../components/Text';
import CarouselParallax from '../components/Home/CarouselParallax';
import {StackParamList} from '../navigator/StackParamList';
import GlobalStyle from '../styles/GlobalStyle';
import Footer from '../components/Footer';
import FlatListExhibitions from '../components/Exhibitions/FlatListExhibitions';
import customAxios from '../services/customAxios';

const PAGE_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = PAGE_WIDTH * 0.9;

const defaultImage = require('../assets/images/main.png');

type CarouselItem = {
  key: string;
  title: string;
  date: string;
  gallery: string;
  image: any;
};

const carouselData: CarouselItem[] = [
  {
    key: '1',
    title: '이경준 사진전',
    date: '2023.12.18',
    gallery: '서울 미술관',
    image: require('../assets/images/artList3.jpg'),
  },
];

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp<StackParamList>>();
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const [ongoingExhibitions, setOngoingExhibitions] = useState([]);
  const ref = useRef(null);
  useScrollToTop(ref);

  const handleIndexChange = (index: number) => {
    setBackgroundIndex(index);
  };

  useEffect(() => {
    fetchOngoingExhibitions();
  }, []);

  const fetchOngoingExhibitions = async () => {
    try {
      const response = await customAxios.get(`/exhibition/ongoing/0`);
      const data = response.data.exhibitionInfos.map((item: any) => ({
        key: item.exhibitionId.toString(),
        title: item.title,
        date: `${item.startDate.split(' ')[0]} ~ ${
          item.finishDate.split(' ')[0]
        }`,
        gallery: item.location,
        image: {uri: item.mainImageUrl},
        exhibitionId: item.exhibitionId,
      }));
      setOngoingExhibitions(data);
    } catch (error: any) {
      console.error(
        'Failed to fetch ongoing exhibitions:',
        error.response?.data,
      );
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        style={{flex: 1}}
        ref={ref}>
        <Image
          source={
            carouselData.length > 0
              ? carouselData[backgroundIndex % carouselData.length].image
              : defaultImage
          }
          style={[
            styles.backgroundImage,
            {width: PAGE_WIDTH, height: PAGE_WIDTH * (4 / 3)},
          ]}
          blurRadius={15}
        />
        <View style={[GlobalStyle.header]}>
          <Image
            source={require('../assets/icons/ArtvewLogoReal.png')}
            style={GlobalStyle.logo}
          />
        </View>
        <View style={[styles.titleContainerTemp, {paddingTop: 18}]}>
          <Text style={styles.sectionTitle}>내 전시기록</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Records')}>
            <Text style={styles.viewAllText}>전체보기 &gt;</Text>
          </TouchableOpacity>
        </View>
        {carouselData.length > 0 ? (
          <CarouselParallax
            data={carouselData}
            onIndexChange={handleIndexChange}
          />
        ) : (
          <View style={styles.carouselPlaceholder}>
            <Image source={defaultImage} style={styles.defaultImage} />
          </View>
        )}
        <View style={[GlobalStyle.container]}>
          <FlatListExhibitions
            data={ongoingExhibitions}
            title={'진행 중인 전시'}
            onPress={item =>
              navigation.navigate('ExhibitionDetail', {
                exhibitionId: item.exhibitionId,
              })
            }
          />
        </View>
        <Footer />
      </ScrollView>
      <TouchableOpacity
        style={GlobalStyle.floatingButton}
        onPress={() => navigation.navigate('RecordingStart')}>
        <Text style={GlobalStyle.floatingButtonText}>+ 기록하기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    resizeMode: 'cover',
  },
  titleContainerTemp: {
    flexDirection: 'row',
    alignItems: 'baseline',
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  viewAllText: {
    fontSize: 12,
    color: '#4E4E4E',
    paddingLeft: 10,
  },
  carouselPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    width: PAGE_WIDTH,
    height: PAGE_WIDTH * (4 / 3),
  },
  defaultImage: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH * (4 / 3),
    resizeMode: 'cover',
    borderRadius: 30,
  },
});
