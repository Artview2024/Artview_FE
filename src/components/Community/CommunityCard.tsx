import React, {memo} from 'react';
import {
  View,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import GlobalStyle from '../../styles/GlobalStyle';
import Icon from 'react-native-vector-icons/FontAwesome';
import LikeButton from './LikeButton';
import Text from '../../components/Text';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {StackParamList} from '../../navigator/StackParamList';

const PAGE_WIDTH = Dimensions.get('window').width;

const highlightKeyword = (text: string, keyword: string) => {
  if (!keyword) return text;
  const regex = new RegExp(`(${keyword})`, 'gi');
  const parts = text.split(regex);

  return parts.map((part, index) =>
    part.toLowerCase() === keyword.toLowerCase() ? (
      <Text key={index} style={GlobalStyle.pointColor}>
        {part}
      </Text>
    ) : (
      <Text key={index}>{part}</Text>
    ),
  );
};

const CommunityCard = memo(
  ({Posts, searchKeyword}: {Posts: any; searchKeyword: string}) => {
    const navigation = useNavigation<NavigationProp<StackParamList>>();

    if (!Posts || !Posts.ImageAndTitle) {
      return (
        <View style={{paddingBottom: 30}}>
          <Text>포스트가 없습니다.</Text>
        </View>
      );
    }

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
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('OtherUser', {writerId: Posts.writerId})
            }>
            <Image
              source={
                Posts.writerImage
                  ? {uri: Posts.writerImage}
                  : require('../../assets/images/user.png')
              }
              style={{width: 35, height: 35, borderRadius: 20, marginRight: 10}}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate('OtherUser', {writerId: Posts.writerId})
            }>
            <Text style={[GlobalStyle.CommunityCardUser]}>
              {Posts.writerName}
            </Text>
          </TouchableOpacity>
        </View>

        {imageAndTitle.length > 0 ? (
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
        ) : (
          <Text>이미지 없음</Text>
        )}

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={GlobalStyle.CommunityCardTitle}>
              {highlightKeyword(Posts.name, searchKeyword)}
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon name="star" size={14} color="#EA1B83" />
              <Text style={[GlobalStyle.CommunityCardRating, {paddingLeft: 3}]}>
                {Posts.rate}
              </Text>
            </View>
          </View>

          <LikeButton
            communicationsId={Posts.communicationsId}
            isHeartClicked={Posts.isHeartClicked}
          />
        </View>

        <View style={{paddingBottom: 7}}>
          <Text style={GlobalStyle.CommunityCardText}>
            {Posts.date} | {highlightKeyword(Posts.gallery, searchKeyword)}
          </Text>
        </View>

        <Text style={[GlobalStyle.CommunityCardText, {paddingBottom: 7}]}>
          {highlightKeyword(Posts.content, searchKeyword)}
        </Text>

        <View style={GlobalStyle.EmotionView}>
          {Posts.keyword?.map((emotion: string, index: number) => (
            <Text key={index} style={GlobalStyle.EmotionButton}>
              {emotion}
            </Text>
          ))}
        </View>
      </View>
    );
  },
);

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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderRadius: 5,
  },
  imageTitle: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default CommunityCard;
