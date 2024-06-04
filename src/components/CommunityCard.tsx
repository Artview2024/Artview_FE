import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import GlobalStyle from '../styles/GlobalStyle';

const CommunityCard = ({Posts}: {Posts: any}) => {
  return (
    <View>
      {/* User and profile */}
      <View>
        {/* User profile image */}
        {/* <Image
          source={require('../assets/images/user-profile.png')} // Replace with actual user profile image
          style={styles.userProfileImage}
        /> */}
        {/* User name */}
        <Text>{Posts.user}</Text>
      </View>

      {/* Image */}
      <Image source={Posts.image[0]} />

      {/* Title and rating */}
      <View>
        <Text>{Posts.title}</Text>
        {/* Display rating here */}
      </View>

      {/* Date and gallery */}
      <View>
        <Text>{Posts.date}</Text>
        <Text>{Posts.gallery}</Text>
      </View>

      {/* Content */}
      <Text>{Posts.content}</Text>

      {/* Emotion buttons */}
      <View>
        <Text>{Posts.emotion[0]}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Define your styles here
  // ...
});

export default CommunityCard;
