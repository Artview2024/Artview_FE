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
import {API_BASE_URL} from '@env';
import CommunityCard from '../../components/Community/CommunityCard';
import Comment from '../../components/Community/Comment';
import GlobalStyle from '../../styles/GlobalStyle';
import BackIcon from 'react-native-vector-icons/Ionicons';

interface Reply {
  id: number;
  writerId: number;
  writername: string;
  content: string;
  writerImage: string;
  createDate: string;
}

interface CommentData {
  id: number;
  writerId: number;
  writername: string;
  content: string;
  writerImage: string;
  createDate: string;
  replies: Reply[];
}

export default function CommunityDetailScreen() {
  const navigation = useNavigation();
  const ref = useRef<ScrollView>(null);
  const inputRef = useRef<TextInput>(null);
  useScrollToTop(ref);

  const [comments, setComments] = useState<CommentData[]>([]);
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState<number | null>(null);

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/communications/comments/1`,
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ACCESS TOKEN`,
          },
        },
      );
      setComments(response.data);
    } catch (error) {
      console.error('댓글을 가져오는 데 실패했습니다.', error);
    }
  };

  // 댓글 조회
  useEffect(() => {
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
      await postComment(replyTo); // replyTo 값에 따라 댓글 또는 답글 처리
    }
  };

  // 댓글/답글 POST
  const postComment = async (parentContentId: number | null) => {
    try {
      await axios.post(
        '/api/communications/comment',
        {
          communicationsId: 1, // 실제 게시글 ID로 수정 필요!!!!
          content: newComment,
          parentContentId: parentContentId, // parentContentId가 null이면 최상위 댓글
        },
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ACCESS TOKEN`,
          },
        },
      );

      // 댓글 목록 재소환 - 댓글 실시간 반영
      await fetchComments();

      setNewComment('');
      setReplyTo(null);
    } catch (error) {
      console.error('댓글 등록에 실패했습니다.', error);
      Alert.alert('Error', '댓글 등록에 실패했습니다.');
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
                {' '}
                <Comment
                  username={comment.writername}
                  content={comment.content}
                  userImage={comment.writerImage}
                  onReply={() => handleReply(comment.id)}
                />
                {comment.replies.map((reply: Reply) => (
                  <View key={reply.id} style={{marginLeft: 40, marginTop: -10}}>
                    {' '}
                    <Comment
                      username={reply.writername}
                      content={reply.content}
                      userImage={reply.writerImage}
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
