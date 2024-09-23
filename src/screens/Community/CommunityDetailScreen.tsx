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
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  useScrollToTop,
  useNavigation,
  RouteProp,
} from '@react-navigation/native';
import axios from 'axios';
import {API_BASE_URL} from '@env';
import CommunityCard from '../../components/Community/CommunityCard';
import GlobalStyle from '../../styles/GlobalStyle';
import BackIcon from 'react-native-vector-icons/Ionicons';
import Comment from '../../components/Community/Comment';
import {StackParamList} from '../../navigator/StackParamList';

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

interface PostData {
  communicationsId: number;
  ImageAndTitle: Record<string, string>;
  name: string;
  rate: string;
  date: string;
  gallery: string;
  content: string;
  keyword: string[];
  writerId: number;
  writerName: string;
  writerImage: string;
}

export default function CommunityDetailScreen({
  route,
}: {
  route: RouteProp<StackParamList, 'CommunityDetail'>;
}) {
  const navigation = useNavigation();
  const ref = useRef<ScrollView>(null);
  const inputRef = useRef<TextInput>(null);
  useScrollToTop(ref);

  const {communicationsId} = route.params;
  const [post, setPost] = useState<PostData | null>(null);
  const [comments, setComments] = useState<CommentData[]>([]);
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState<number | null>(null);

  // 게시물 정보 가져오기
  const fetchPost = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/communications/content/${communicationsId}`,
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ACCESS_TOKEN`,
          },
        },
      );
      setPost(response.data);
    } catch (error) {
      console.error('게시물을 가져오는 데 실패했습니다.', error);
    }
  };

  // 댓글 정보 가져오기
  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/communications/comment/${communicationsId}`,
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

  // 처음 렌더링 시 게시물과 댓글을 가져옴
  useEffect(() => {
    fetchPost();
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
  }, [communicationsId]);

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
        `${API_BASE_URL}/communications/comment`,
        {
          communicationsId: communicationsId,
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

  // 답글 작성
  const handleReply = (commentId: number) => {
    setReplyTo(commentId); // 댓글 ID를 설정하여 답글 대상 설정
    inputRef.current?.focus(); // 답글 버튼을 누르면 입력창에 포커스

    // 키보드가 열리도록 강제로 요청
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus(); // 포커스 맞추기
      }
    }, 100); // 타이머를 통해 포커스 맞춘 후 키보드 재활성화
  };

  if (!post) {
    return (
      <View style={GlobalStyle.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={GlobalStyle.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackIcon
            name="chevron-back"
            size={24}
            color={'black'}
            style={{paddingRight: 3, paddingVertical: 18}}
          />
        </TouchableOpacity>
        <ScrollView ref={ref}>
          {/* 게시물 상세 정보 */}
          <CommunityCard Posts={post} />

          <View style={{marginTop: 20}}></View>

          {/* 댓글이 있을 경우에만 댓글을 보여줌 */}
          {comments.length > 0 ? (
            <>
              <View
                style={{
                  marginBottom: 10,
                  borderWidth: 0.2,
                  borderColor: '#ddd',
                }}></View>

              {/* 댓글 및 답글 목록 */}
              <View>
                {comments.map(comment => (
                  <View key={comment.id}>
                    <Comment
                      username={comment.writername} // 올바르게 전달된 username
                      content={comment.content}
                      userImage={comment.writerImage}
                      onReply={() => handleReply(comment.id)}
                    />
                    {comment.replies.map((reply: Reply) => (
                      <View
                        key={reply.id}
                        style={{marginLeft: 40, marginTop: -10}}>
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
            </>
          ) : (
            <Text>댓글이 없습니다.</Text> // 댓글이 없을 때 대체 텍스트
          )}
        </ScrollView>

        {/* 댓글 입력창 */}
        <View style={styles.commentInputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              ref={inputRef}
              style={styles.commentInput}
              value={newComment}
              onChangeText={setNewComment}
              placeholder={replyTo ? '답글 남기기' : '댓글 남기기'}
              placeholderTextColor="#999" // placeholder 텍스트 색상 지정
            />
            <TouchableOpacity
              style={styles.postButton}
              onPress={handleAddComment}>
              <Text style={styles.postButtonText}>Post</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  commentInputContainer: {
    paddingTop: 10,
    paddingBottom: 10,
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
    color: '#000',
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
