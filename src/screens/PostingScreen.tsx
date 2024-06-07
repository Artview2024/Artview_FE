import React, {useState} from 'react';
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
import {StackParamList} from '../navigator/AppNavigator';
import BackIcon from 'react-native-vector-icons/Ionicons';
import RatingIcon from 'react-native-vector-icons/FontAwesome';
import '../navigator/AppNavigator';

import GlobalStyle from '../styles/GlobalStyle';

type PostingScreenRouteProp = RouteProp<StackParamList, 'Posting'>;

export default function PostingScreen() {
  const navigation = useNavigation<NavigationProp<StackParamList>>();
  const route = useRoute<PostingScreenRouteProp>();
  const {exhibition} = route.params;
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);

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

  return (
    <View style={[GlobalStyle.container]}>
      <ScrollView>
        {/* header */}
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

        {/* info */}
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
              {exhibition.rating}
            </Text>
          </View>
          <View style={{paddingTop: 3}}>
            <Text style={GlobalStyle.mainText}>
              {exhibition.date} | {exhibition.gallery}
            </Text>
          </View>
        </View>

        {/* Image List */}
        <View style={{marginTop: 18}}>
          <FlatList
            horizontal
            data={exhibition.imageList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <Image source={item} style={styles.imageItem} />
            )}
          />
        </View>

        {/* Writing Input */}
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
          />
        </View>

        {/* Keyword Buttons */}
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

        {/* 포스팅 성공하면 소통 메인페이지로 */}
        <TouchableOpacity
          style={[
            GlobalStyle.activeButton,
            GlobalStyle.fullButton,
            {marginTop: 30},
          ]}>
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
  keywordContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
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
