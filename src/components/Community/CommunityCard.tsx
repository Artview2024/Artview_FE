import React from 'react';
import {View, Text, Image, Dimensions, StyleSheet} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import GlobalStyle from '../../styles/GlobalStyle';
import Icon from 'react-native-vector-icons/FontAwesome';

const PAGE_WIDTH = Dimensions.get('window').width;

const CommunityCard = ({Posts}: {Posts: any}) => {
  const imageAndTitle = Object.entries(
    Posts.ImageAndTitle as Record<string, string>,
  );

  const renderItem = ({item}: {item: [string, string]}) => {
    const [imageUrl, title] = item;
    return (
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{uri: imageUrl}} />
        <View style={styles.titleContainer}>
          <Text style={styles.imageTitle}>{title}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={{paddingBottom: 30}}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={
            Posts.writerImage
              ? {uri: Posts.writerImage}
              : require('../../assets/images/user.png')
          }
          style={{width: 40, height: 40, borderRadius: 20, marginRight: 10}}
        />
        <Text style={GlobalStyle.CommunityCardUser}>{Posts.writerName}</Text>
      </View>

      {/* 이미지 캐러셀 */}
      <Carousel
        width={PAGE_WIDTH}
        height={PAGE_WIDTH * (4 / 3)}
        data={imageAndTitle}
        renderItem={renderItem}
        loop={false}
        autoPlay={false}
        scrollAnimationDuration={1000}
        style={{marginVertical: 13}}
      />

      {/* 제목, 평점 */}
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={GlobalStyle.CommunityCardTitle}>{Posts.title}</Text>
        <Text>
          <Icon name="star" size={14} color="#EA1B83" />
        </Text>
        <Text style={[GlobalStyle.CommunityCardRating, {paddingLeft: 3}]}>
          {Posts.rate}
        </Text>
      </View>

      {/* 날짜, 갤러리 */}
      <View style={{paddingBottom: 7}}>
        <Text style={GlobalStyle.CommunityCardText}>
          {Posts.date} | {Posts.gallery}
        </Text>
      </View>

      {/* 내용 */}
      <Text style={[GlobalStyle.CommunityCardText, {paddingBottom: 7}]}>
        {Posts.content}
      </Text>

      {/* 감정 태그 */}
      <View style={GlobalStyle.EmotionView}>
        {Posts.keyword.map((emotion: string, index: number) => (
          <Text key={index} style={GlobalStyle.EmotionButton}>
            {emotion}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: PAGE_WIDTH,
    height: PAGE_WIDTH * (4 / 3),
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  titleContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 반투명한 배경
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderRadius: 5,
  },
  imageTitle: {
    color: '#ffffff', // 흰색 글씨
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default CommunityCard;
