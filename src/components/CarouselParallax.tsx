import React from 'react';
import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {useSharedValue} from 'react-native-reanimated';

interface CarouselItem {
  key: string;
  title: string;
  date: string;
  gallery: string;
  image: any;
}

interface CarouselProps {
  data: CarouselItem[];
  onIndexChange: (index: number) => void; // 이벤트 핸들러 추가
}

const PAGE_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = PAGE_WIDTH * 0.99;
const ITEM_SPACING = (PAGE_WIDTH - ITEM_WIDTH) / 2;

const CarouselParallax: React.FC<CarouselProps> = ({data, onIndexChange}) => {
  const progress = useSharedValue<number>(0); // 애니메이션 진행 상태 저장

  const handleProgressChange = (
    offsetProgress: number,
    absoluteProgress: number,
  ) => {
    progress.value = absoluteProgress;
    const currentIndex = Math.round(absoluteProgress); // 현재 페이지 인덱스 계산
    onIndexChange(currentIndex); // 인덱스 변경 이벤트 핸들러 호출
  };

  return (
    <View style={styles.carouselContainer}>
      <Carousel
        style={[{width: PAGE_WIDTH, marginTop: -8}]}
        width={ITEM_WIDTH}
        height={ITEM_WIDTH * (4 / 3)}
        data={data}
        renderItem={({item}: {item: CarouselItem}) => (
          <View>
            <Image source={item.image} style={styles.carouselImage} />
            <View style={styles.carouselTextContainer}>
              <Text style={styles.carouselText}>{item.title}</Text>
              <Text style={styles.carouselSubText}>{item.date}</Text>
              <Text style={styles.carouselSubText}>{item.gallery}</Text>
            </View>
          </View>
        )}
        loop
        autoPlay
        autoPlayInterval={3000}
        scrollAnimationDuration={1000}
        pagingEnabled
        snapEnabled
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        onProgressChange={handleProgressChange}
        panGestureHandlerProps={{
          activeOffsetX: [-ITEM_SPACING, ITEM_SPACING],
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingVertical: 0,
    height: ITEM_WIDTH * (4 / 3),
  },

  carouselItem: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: ITEM_WIDTH,
    height: ITEM_WIDTH * (4 / 3),
  },

  carouselImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 30,
  },

  carouselTextContainer: {
    position: 'absolute',
    left: 10,
    bottom: 10,
    padding: 8,
  },

  carouselText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
  },

  carouselSubText: {
    fontSize: 20,
    color: '#fff',
  },
});

export default CarouselParallax;
