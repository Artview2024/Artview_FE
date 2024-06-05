import React from 'react';
import {View, Text, Image, Dimensions} from 'react-native';
import GlobalStyle from '../styles/GlobalStyle';
import Icon from 'react-native-vector-icons/FontAwesome';

const PAGE_WIDTH = Dimensions.get('window').width;

const CommunityCard = ({Posts}: {Posts: any}) => {
  return (
    <View style={{paddingBottom: 27}}>
      <View>
        {/* User profile image */}
        {/* <Image
          source={require('../assets/images/user-profile.png')} // Replace with actual user profile image
          style={styles.userProfileImage}
        /> */}
        <Text style={GlobalStyle.CommunityCardUser}>{Posts.user}</Text>
      </View>

      <Image
        style={{
          marginVertical: 13,
          width: PAGE_WIDTH,
          height: PAGE_WIDTH * (4 / 3),
        }}
        source={Posts.image[0]}
      />

      <View style={{flex: 1, flexDirection: 'row'}}>
        <Text style={GlobalStyle.CommunityCardTitle}>{Posts.title}</Text>
        <Text>
          <Icon name="star" size={14} color="#EA1B83" />;
        </Text>
        <Text style={GlobalStyle.CommunityCardRating}>{Posts.rating}</Text>
      </View>

      <View style={{paddingBottom: 7}}>
        <Text style={GlobalStyle.CommunityCardText}>
          {Posts.date} | {Posts.gallery}
        </Text>
      </View>

      <Text style={[GlobalStyle.CommunityCardText, {paddingBottom: 7}]}>
        {Posts.content}
      </Text>

      <View style={GlobalStyle.EmotionView}>
        {Posts.emotion.map((emotion: string, index: number) => (
          <Text key={index} style={GlobalStyle.EmotionButton}>
            {emotion}
          </Text>
        ))}
      </View>
    </View>
  );
};

export default CommunityCard;
