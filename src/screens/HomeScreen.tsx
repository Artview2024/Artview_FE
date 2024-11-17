import React, {useState, useEffect, useRef, useCallback} from 'react';
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
  useFocusEffect,
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
  exhibitionId: number;
};

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp<StackParamList>>();
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const [carouselData, setCarouselData] = useState<CarouselItem[]>([]);
  const [ongoingExhibitions, setOngoingExhibitions] = useState([]);
  const ref = useRef(null);
  useScrollToTop(ref);

  const handleIndexChange = (index: number) => {
    setBackgroundIndex(index);
  };

  useFocusEffect(
    useCallback(() => {
      fetchCarouselData();
      fetchOngoingExhibitions();
    }, []),
  );

  const fetchCarouselData = async () => {
    try {
      const response = await customAxios.get('/myReviews/main');

      if (Array.isArray(response.data)) {
        const firstThreeRecords = response.data
          .filter((item: any) => item.myReviewsId !== undefined)
          .slice(0, 3)
          .map((item: any) => ({
            key: item.myReviewsId.toString(),
            title: item.exhibitionName,
            date: item.visitedDate,
            gallery: item.location || '',
            image: {uri: item.imageUrl},
            exhibitionId: item.exhibitionId,
            myReviewId: item.myReviewsId,
          }));

        setCarouselData(firstThreeRecords);
      } else {
        console.error('예상치 못한 응답 데이터 구조:', response.data);
        setCarouselData([]);
      }
    } catch (error: any) {
      console.error('Failed to fetch carousel data:', error);
      setCarouselData([]);
    }
  };

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

  const handleCarouselItemPress = (myReviewId: number) => {
    const record = carouselData.find(
      item => item.key === myReviewId.toString(),
    );

    if (record) {
      navigation.navigate('RecordDetail', {
        record: {
          id: parseInt(record.key, 10),
          name: record.title,
          date: record.date,
          mainImage: record.image.uri,
          gallery: record.gallery,
          rating: '',
          artList: [],
          exhibitionId: record.exhibitionId,
        },
        exhibitionId: record.exhibitionId,
      });
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
            onPress={handleCarouselItemPress}
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
                isOnlineExhibition: false,
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
