import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

const Comment = ({
  username,
  content,
  userImage,
}: {
  username: string;
  content: string;
  userImage: any;
}) => {
  return (
    <View style={styles.commentContainer}>
      <Image
        source={typeof userImage === 'string' ? {uri: userImage} : userImage}
        style={styles.userImage}
      />
      <View style={styles.textContainer}>
        <Text style={styles.username}>{username}</Text>
        <Text style={styles.content}>{content}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
  },
  content: {
    fontSize: 14,
    color: '#333',
  },
});

export default Comment;
