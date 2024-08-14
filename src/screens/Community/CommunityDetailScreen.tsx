import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import {useScrollToTop, useNavigation} from '@react-navigation/native';
import axios from 'axios';
import CommunityCard from '../../components/Community/CommunityCard';
import Comment from '../../components/Community/Comment';
import GlobalStyle from '../../styles/GlobalStyle';
import BackIcon from 'react-native-vector-icons/Ionicons';

export default function CommunityDetailScreen() {
  const navigation = useNavigation();
  const ref = useRef(null);
  useScrollToTop(ref);

  const [comments, setComments] = useState([
    {
      username: 'User1',
      content: '짱이다',
      userImage: require('../../assets/images/user.png'),
    },
    {
      username: 'User2',
      content: '저도 갈래요',
      userImage: require('../../assets/images/user.png'),
    },
  ]);

  const [newComment, setNewComment] = useState('');

  const handleAddComment = async () => {
    if (newComment.trim()) {
      try {
        const response = await axios.post('http://13.125.81.126/api/comment', {
          content: newComment,
        });
        if (response.status === 201) {
          setComments([
            ...comments,
            {
              username: 'CurrentUser',
              content: newComment,
              userImage: require('../../assets/images/user.png'),
            },
          ]);
          setNewComment('');
        } else {
          Alert.alert('Error', '댓글 등록에 실패하였습니다.');
        }
      } catch (error) {
        console.error(error);
        Alert.alert('Error', '댓글 등록에 실패하였습니다.');
      }
    }
  };

  const samplePost = {
    key: '1',
    user: '포도',
    profile: '',
    title: 'SERIOUS',
    date: '2024.05.14',
    gallery: '성남 갤러리홀',
    image: [
      require('../../assets/images/carousel6.jpg'),
      require('../../assets/images/recommend1.png'),
    ],
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
    emotion: ['아름다운', '어려운'],
    rating: '4.0',
  };

  return (
    <>
      <View style={[GlobalStyle.container]} ref={ref}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackIcon
            name="chevron-back"
            size={24}
            color={'black'}
            style={{paddingRight: 3, paddingVertical: 18}}
          />
        </TouchableOpacity>
        <ScrollView ref={ref}>
          <CommunityCard Posts={samplePost} />
          <View style={{marginTop: 20}}></View>
          <View
            style={{
              marginBottom: 10,
              borderWidth: 0.2,
              borderColor: '#ddd',
            }}></View>
          <View>
            {comments.map((comment, index) => (
              <Comment
                key={index}
                username={comment.username}
                content={comment.content}
                userImage={comment.userImage}
              />
            ))}
          </View>
        </ScrollView>
      </View>
      <View style={styles.commentInputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.commentInput}
            value={newComment}
            onChangeText={setNewComment}
            placeholder="댓글 남기기"
          />
          <TouchableOpacity
            style={styles.postButton}
            onPress={handleAddComment}>
            <Text style={styles.postButtonText}>Post</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  commentInputContainer: {
    padding: 10,
    backgroundColor: 'white',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  commentInput: {
    flex: 1,
    height: 40,
  },
  postButton: {
    marginLeft: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: 'black',
    borderRadius: 15,
  },
  postButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
