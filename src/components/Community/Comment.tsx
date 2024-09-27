import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Text from '../../components/Text';

interface CommentProps {
  username: string;
  content: string;
  userImage: string | {uri: string} | undefined; // 이미지의 타입 명확화
  onReply?: () => void;
  isReply?: boolean; // 답글인지 여부
}

const Comment = ({
  username,
  content,
  userImage,
  onReply,
  isReply = false, // 기본값 false로 설정
}: CommentProps) => {
  return (
    <View style={styles.commentContainer}>
      {/* 이미지가 올바르게 전달되지 않았을 때 기본 이미지 처리 */}
      {userImage ? (
        <Image
          source={typeof userImage === 'string' ? {uri: userImage} : userImage}
          style={styles.userImage}
        />
      ) : (
        <View style={styles.userImagePlaceholder} />
      )}
      <View style={styles.textContainer}>
        <Text style={{color: 'black'}}>{username}</Text>
        <Text style={styles.content}>{content}</Text>
        {/* 답글이 아닌 경우에만 답글쓰기 버튼을 보여줌 */}
        {!isReply && onReply && (
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
    alignSelf: 'flex-start',
  },
  userImagePlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#ddd', // 기본 이미지 대신 사용할 색상
  },
  textContainer: {
    flex: 1,
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
