import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

const Comment = ({
  username,
  content,
  userImage,
  onReply,
}: {
  username: string;
  content: string;
  userImage: any;
  onReply?: () => void;
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
        {onReply && (
          <TouchableOpacity onPress={onReply}>
            <Text style={styles.replyButton}>답글쓰기</Text>
          </TouchableOpacity>
        )}
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
    alignSelf: 'flex-start', // 이미지가 텍스트와 동일한 라인에 위치하도록 조정
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
  replyButton: {
    color: '#828282',
    marginTop: 3,
    fontSize: 12,
  },
});

export default Comment;
