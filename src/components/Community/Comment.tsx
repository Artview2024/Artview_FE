import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Comment = ({username, content}: {username: any; content: any}) => {
  return (
    <View style={styles.commentContainer}>
      <Text style={styles.username}>{username}</Text>
      <Text style={styles.content}>{content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  commentContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 10,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  content: {
    fontSize: 14,
    color: '#333',
  },
});

export default Comment;
