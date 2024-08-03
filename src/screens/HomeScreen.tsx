import React, {useState, useRef} from 'react';
import {
  View,
  Text,
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
import CarouselParallax from '../components/Home/CarouselParallax';
import {StackParamList} from '../navigator/StackParamList';
import GlobalStyle from '../styles/GlobalStyle';
import Footer from '../components/Footer';
import RecommendedExhibition from '../components/Home/RecommendedExhibitions';

const PAGE_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = PAGE_WIDTH * 0.9;

const defaultImage = require('../assets/images/main.png'); //디자인.. 문의 후 수정 필요

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
  {
    key: '2',
    title: '인상주의의 출현',
    date: '2023.12.18',
    gallery: '서울 미술관',
    image: require('../assets/images/carousel4.jpg'),
  },
  {
    key: '3',
    title: 'SF 2021:판타지 오디세이',
    date: '2023.12.18',
    gallery: '서울시립북서울미술관',
    image: require('../assets/images/carousel7.jpg'),
  },
];

const recommendedExhibitions = [
  {
    key: '1',
    title: 'SERIOUS',
    date: '2024.05.14~05.30',
    gallery: '성남 갤러리홀',
    image: require('../assets/images/recommend1.png'),
  },
  {
    key: '2',
    title: '웨딩전',
    date: '2024.05.04~07.30',
    gallery: '갤러리',
    image: require('../assets/images/recommend2.png'),
  },
  {
    key: '3',
    title: '웨딩전',
    date: '2024.05.04~07.30',
    gallery: '갤러리',
    image: require('../assets/images/carousel1.png'),
  },
];

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp<StackParamList>>();
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const ref = useRef(null);
  useScrollToTop(ref);

  const handleIndexChange = (index: number) => {
    setBackgroundIndex(index);
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
        {/* <View style={{flex: 1, backgroundColor: '#fff', paddingLeft: 20}}>
          <View style={styles.titleContainer}>
            <Text style={styles.sectionTitle}>추천전시</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>전체보기 &gt;</Text>
            </TouchableOpacity>
          </View>
          {recommendedExhibitions.map(exhibition => (
            <RecommendedExhibition
              key={exhibition.key}
              exhibition={exhibition}
            />
          ))}
        </View> */}
        <RecommendedExhibition data={recommendedExhibitions} />
        <Footer></Footer>
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
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    paddingVertical: 18,
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
