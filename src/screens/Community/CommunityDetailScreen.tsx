import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Keyboard,
} from 'react-native';
import Text from '../../components/Text';
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
import customAxios from '../../services/customAxios';

interface Reply {
  id: number;
  writerId: number;
  writerName: string;
  content: string;
  writerImage: string;
  createDate: string;
}

interface CommentData {
  id: number;
  commentId: number;
  writerId: number;
  writerName: string;
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

  const fetchPost = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/communications/content/${communicationsId}`,
        {
          headers: {
            Accept: 'application/json',
          },
        },
      );
      setPost(response.data);
    } catch (error: any) {
      console.error('게시물을 가져오는 데 실패했습니다.', error.response.data);
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
          },
        },
      );
      setComments(response.data);
    } catch (error: any) {
      console.error('댓글을 가져오는 데 실패했습니다.', error.response.data);
    }
  };

  useEffect(() => {
    fetchPost();
    fetchComments();

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

  const handleAddComment = async () => {
    if (newComment.trim()) {
      await postComment(replyTo);
    }
  };

  const postComment = async (parentContentId: number | null) => {
    try {
      await customAxios.post('/communications/comment', {
        communicationsId: communicationsId,
        content: newComment,
        parentContentId: parentContentId || null,
      });

      await fetchComments();

      setNewComment('');
      setReplyTo(null);
    } catch (error) {
      console.error('댓글 작성 실패:', error);
    }
  };

  const handleReply = (commentId: number) => {
    setReplyTo(commentId);
    inputRef.current?.focus();
  };

  if (!post) {
    return (
      <View style={GlobalStyle.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={GlobalStyle.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <BackIcon
          name="chevron-back"
          size={24}
          color={'black'}
          style={{paddingRight: 3, paddingVertical: 18}}
        />
      </TouchableOpacity>
      <ScrollView ref={ref}>
        <CommunityCard Posts={post} />
        {comments.length > 0 ? (
          <>
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
                    username={comment.writerName}
                    content={comment.content}
                    userImage={comment.writerImage}
                    onReply={() => handleReply(comment.commentId)}
                  />
                  {comment.replies.map((reply: Reply) => (
                    <View
                      key={reply.id}
                      style={{marginLeft: 40, marginTop: -10}}>
                      <Comment
                        username={reply.writerName}
                        content={reply.content}
                        userImage={reply.writerImage}
                        isReply={true}
                      />
                    </View>
                  ))}
                </View>
              ))}
            </View>
          </>
        ) : (
          <Text> </Text>
        )}
      </ScrollView>

      <View style={styles.commentInputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            ref={inputRef}
            style={styles.commentInput}
            value={newComment}
            onChangeText={setNewComment}
            placeholder={replyTo ? '답글 남기기' : '댓글 남기기'}
            placeholderTextColor="#999"
            allowFontScaling={false}
          />
          <TouchableOpacity
            style={styles.postButton}
            onPress={handleAddComment}>
            <Text style={styles.postButtonText}>Post</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
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
