import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  FlatList,
} from 'react-native';
import {
  useNavigation,
  NavigationProp,
  useRoute,
  RouteProp,
} from '@react-navigation/native';
import axios from 'axios';
import {StackParamList} from '../../navigator/StackParamList';
import BackIcon from 'react-native-vector-icons/Ionicons';
import RatingIcon from 'react-native-vector-icons/FontAwesome';
import GlobalStyle from '../../styles/GlobalStyle';

type PostingScreenRouteProp = RouteProp<StackParamList, 'Posting'>;

export default function PostingScreen() {
  const navigation = useNavigation<NavigationProp<StackParamList>>();
  const route = useRoute<PostingScreenRouteProp>();
  const {recordId} = route.params;
  const [exhibition, setExhibition] = useState<any>(null);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    const fetchExhibitionDetails = async () => {
      if (recordId) {
        console.log('Fetching details for recordId:', recordId);
        try {
          const response = await axios.get(
            `http://13.125.81.126/api/communications/retrieve/${recordId}`,
            {
              headers: {
                Accept: 'application/json',
                Authorization: `Bearer ACCESS_TOKEN`,
              },
            },
          );
          console.log('Fetched exhibition details:', response.data);
          setExhibition(response.data);
        } catch (error) {
          console.error('Error fetching exhibition details:', error);
        }
      } else {
        console.error('recordId is undefined, cannot fetch details');
      }
    };

    fetchExhibitionDetails();
  }, [recordId]);

  if (!exhibition) {
    return (
      <View
        style={[
          GlobalStyle.container,
          {justifyContent: 'center', alignItems: 'center'},
        ]}>
        <Text>전시 정보를 불러오는 중입니다...</Text>
      </View>
    );
  }

  const keywords = [
    '아름다운',
    '인상적인',
    '신비로운',
    '어려운',
    '유쾌한',
    '심오한',
    '슬픈',
    '+',
  ];

  const handleKeywordSelect = (keyword: string) => {
    if (selectedKeywords.includes(keyword)) {
      setSelectedKeywords(selectedKeywords.filter(k => k !== keyword));
    } else {
      setSelectedKeywords([...selectedKeywords, keyword]);
    }
  };

  const handlePost = () => {
    if (exhibition) {
      const newPost = {
        key: new Date().toISOString(),
        user: '미술마니아',
        profile: '',
        title: exhibition.name,
        date: exhibition.date,
        gallery: exhibition.gallery,
        image: exhibition.images,
        content,
        emotion: selectedKeywords,
        rating: exhibition.rate,
      };

      navigation.navigate('Community', {newPost}); // 게시 후 커뮤니티 화면으로 이동
    }
  };

  return (
    <View style={[GlobalStyle.container]}>
      <ScrollView>
        {/* 헤더 */}
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackIcon
              name="chevron-back"
              size={24}
              color={'black'}
              style={{paddingRight: 3, paddingTop: 20, fontSize: 24}}
            />
          </TouchableOpacity>
        </View>

        {/* 전시 정보 */}
        <View style={{paddingTop: 25}}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={[
                GlobalStyle.sectionTitle,
                {paddingVertical: 0, paddingRight: 8},
              ]}>
              {exhibition.name}
            </Text>

            <RatingIcon
              name="star"
              size={14}
              color="#EA1B83"
              style={{paddingRight: 5}}
            />
            <Text style={[GlobalStyle.subText, {color: '#EA1B83'}]}>
              {exhibition.rate}
            </Text>
          </View>
          <View style={{paddingTop: 3}}>
            <Text style={GlobalStyle.mainText}>
              {exhibition.date} | {exhibition.gallery}
            </Text>
          </View>
        </View>

        {/* 이미지 리스트 */}
        <View style={{marginTop: 18}}>
          <FlatList
            horizontal
            data={exhibition.images}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <Image source={{uri: item}} style={styles.imageItem} />
            )}
          />
        </View>

        {/* 글쓰기 입력 */}
        <View style={{marginTop: 28}}>
          <Text
            style={[
              GlobalStyle.mainText,
              {fontWeight: 'bold', marginBottom: 10},
            ]}>
            글쓰기
          </Text>
          <TextInput
            style={[
              GlobalStyle.inputBox,
              {height: 205, textAlignVertical: 'top'},
            ]}
            placeholder="..."
            multiline
            value={content}
            onChangeText={setContent}
          />
        </View>

        {/* 키워드 버튼 */}
        <View style={{marginTop: 28}}>
          <Text
            style={[
              GlobalStyle.mainText,
              {fontWeight: 'bold', marginBottom: 10},
            ]}>
            감상 키워드
          </Text>
          <View style={[GlobalStyle.EmotionView, {borderColor: '#4E4E4E'}]}>
            {keywords.map(keyword => (
              <TouchableOpacity
                key={keyword}
                style={[
                  styles.EmotionButton,
                  selectedKeywords.includes(keyword) && {
                    backgroundColor: '#4E4E4E',
                  },
                ]}
                onPress={() => handleKeywordSelect(keyword)}>
                <Text
                  style={[
                    styles.keywordText,
                    selectedKeywords.includes(keyword) && {
                      color: '#ffff',
                    },
                  ]}>
                  {keyword}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 게시 버튼 */}
        <TouchableOpacity
          style={[
            GlobalStyle.activeButton,
            GlobalStyle.fullButton,
            {marginTop: 30},
          ]}
          onPress={handlePost}>
          <Text style={GlobalStyle.buttonText}>게시</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  imageItem: {
    width: 150,
    height: 200,
    marginRight: 10,
    borderRadius: 10,
  },
  EmotionButton: {
    flexBasis: '22%',
    maxWidth: '22%',
    borderColor: '#4E4E4E',
    borderWidth: 1,
    borderRadius: 15,
    paddingVertical: 5,
    marginBottom: 10,
    alignItems: 'center',
    marginHorizontal: '1%',
  },

  keywordText: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
