import React from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {useRoute, RouteProp, useNavigation} from '@react-navigation/native';
import {StackParamList} from '../navigator/StackParamList';
import BackIcon from 'react-native-vector-icons/Ionicons';
import StarIcon from 'react-native-vector-icons/FontAwesome';
import GlobalStyle from '../styles/GlobalStyle';

type RecordDetailScreenRouteProp = RouteProp<StackParamList, 'RecordDetail'>;

export default function RecordDetailScreen() {
  const route = useRoute<RecordDetailScreenRouteProp>();
  const navigation = useNavigation();
  const {record} = route.params;
  const PAGE_WIDTH = Dimensions.get('window').width - 40;

  const renderItem = ({
    item,
  }: {
    item: {image: any; title: string; artist: string; contents: string};
  }) => (
    <View style={[{width: PAGE_WIDTH}]}>
      <Image source={item.image} style={styles.imagePreview} />
      <Text style={[GlobalStyle.mainText, {marginBottom: 10}]}>
        {item.title}
      </Text>
      <Text
        style={[GlobalStyle.subText, {marginBottom: 7, fontWeight: 'regular'}]}>
        {item.artist}
      </Text>
      <Text
        style={[GlobalStyle.subText, {marginBottom: 7, fontWeight: 'regular'}]}>
        {item.contents}
      </Text>
    </View>
  );

  return (
    <View style={[GlobalStyle.container]}>
      <ScrollView>
        <View>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackIcon
              name="chevron-back"
              size={24}
              color={'black'}
              style={{paddingRight: 3, paddingTop: 11}}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            paddingTop: 25,
          }}>
          <Text
            style={[
              GlobalStyle.sectionTitle,
              {paddingVertical: 0, paddingRight: 8},
            ]}>
            {record.name}
          </Text>
          <Text>
            <StarIcon name="star" size={14} color="#EA1B83" />
          </Text>
          <Text style={[GlobalStyle.CommunityCardRating, {paddingLeft: 3}]}>
            {record.rating}
          </Text>
        </View>
        <Text style={{paddingTop: 7, paddingBottom: 13}}>
          {record.date} | {record.gallery}
        </Text>
        <FlatList
          data={record.artList}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        />
      </ScrollView>
      <View>
        <TouchableOpacity
          style={[GlobalStyle.activeButton, GlobalStyle.fullButton]}>
          <Text style={GlobalStyle.buttonText}>수정하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imagePreview: {
    width: '100%',
    height: undefined,
    aspectRatio: 3 / 4,
    resizeMode: 'cover',
    borderRadius: 5,
    marginBottom: 24,
  },
});
