import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  Keyboard,
} from 'react-native';
import {useScrollToTop, useNavigation} from '@react-navigation/native';
import axios from 'axios';
import CommunityCard from '../../components/Community/CommunityCard';
import Comment from '../../components/Community/Comment';
import GlobalStyle from '../../styles/GlobalStyle';
import BackIcon from 'react-native-vector-icons/Ionicons';

// 댓글과 답글의 타입 정의
interface Reply {
  id: number;
  username: string;
  content: string;
  userImage: any;
}

interface CommentData {
  id: number;
  username: string;
  content: string;
  userImage: any;
  replies: Reply[];
}

export default function CommunityDetailScreen() {
  const navigation = useNavigation();
  const ref = useRef<ScrollView>(null);
  const inputRef = useRef<TextInput>(null);
  useScrollToTop(ref);

  const [comments, setComments] = useState<CommentData[]>([]);
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState<number | null>(null); // 답글을 다는 대상 댓글의 ID

  useEffect(() => {
    const fetchComments = async () => {
      try {
        // Mock 데이터 사용
        const response = {
          data: [
            {
              id: 1,
              username: 'User1',
              content: '짱이다',
              userImage: require('../../assets/images/user.png'),
              replies: [],
            },
            {
              id: 2,
              username: 'User2',
              content: '저도 갈래요',
              userImage: require('../../assets/images/user.png'),
              replies: [
                {
                  id: 1,
                  username: 'User3',
                  content: '저도요!',
                  userImage: require('../../assets/images/user.png'),
                },
              ],
            },
          ],
        };
        setComments(response.data);
      } catch (error) {
        console.error('댓글을 가져오는 데 실패했습니다.', error);
      }
    };
    fetchComments();

    // 키보드가 닫힐 때 replyTo 상태 초기화
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setReplyTo(null);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);

  // 댓글 추가
  const handleAddComment = async () => {
    if (newComment.trim()) {
      if (replyTo) {
        await postReply(replyTo);
      } else {
        await postComment();
      }
    }
  };

  // 댓글 POST 요청
  const postComment = async () => {
    try {
      const response = {
        data: {
          id: Math.random(),
        },
      };

      const newCommentData: CommentData = {
        id: response.data.id, // 백엔드에서 받은 ID
        username: 'CurrentUser', // 실제 사용자명으로 대체
        content: newComment,
        userImage: require('../../assets/images/user.png'), // 실제 사용자 이미지 경로로 대체
        replies: [],
      };

      setComments([...comments, newCommentData]);
      setNewComment('');
    } catch (error) {
      console.error('댓글 등록에 실패했습니다.', error);
      Alert.alert('Error', '댓글 등록에 실패했습니다.');
    }
  };

  // 답글 POST 요청
  const postReply = async (commentId: number) => {
    try {
      const response = {
        data: {
          id: Math.random(),
        },
      };

      const newReply: Reply = {
        id: response.data.id,
        username: 'CurrentUser',
        content: newComment,
        userImage: require('../../assets/images/user.png'),
      };

      setComments(prevComments =>
        prevComments.map(comment =>
          comment.id === commentId
            ? {...comment, replies: [...comment.replies, newReply]}
            : comment,
        ),
      );
      setNewComment('');
      setReplyTo(null); // 답글 완료 후 초기화
    } catch (error) {
      console.error('답글 등록에 실패했습니다.', error);
      Alert.alert('Error', '답글 등록에 실패했습니다.');
    }
  };

  const handleReply = (commentId: number) => {
    setReplyTo(commentId);
    inputRef.current?.focus(); // 답글 버튼을 누르면 입력창에 포커스
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
      <View style={[GlobalStyle.container]}>
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
            {comments.map(comment => (
              <View key={comment.id}>
                <Comment
                  username={comment.username}
                  content={comment.content}
                  userImage={comment.userImage}
                  onReply={() => handleReply(comment.id)}
                />
                {/* 답글 */}
                {comment.replies.map((reply: Reply) => (
                  <View key={reply.id} style={{marginLeft: 40, marginTop: -10}}>
                    <Comment
                      username={reply.username}
                      content={reply.content}
                      userImage={reply.userImage}
                      onReply={undefined}
                    />
                  </View>
                ))}
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
      <View style={styles.commentInputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            ref={inputRef}
            style={styles.commentInput}
            value={newComment}
            onChangeText={setNewComment}
            placeholder={replyTo ? '답글 남기기' : '댓글 남기기'}
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
