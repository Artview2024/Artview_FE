import React, {useState, useEffect} from 'react';
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
import axios from 'axios';
import {StackParamList, Record} from '../../navigator/StackParamList';
import BackIcon from 'react-native-vector-icons/Ionicons';
import StarIcon from 'react-native-vector-icons/FontAwesome';
import GlobalStyle from '../../styles/GlobalStyle';
import {API_BASE_URL} from '@env';

type RecordDetailScreenRouteProp = RouteProp<StackParamList, 'RecordDetail'>;

export default function RecordDetailScreen() {
  const route = useRoute<RecordDetailScreenRouteProp>();
  const navigation = useNavigation();
  const {id} = route.params.record;
  const [record, setRecord] = useState<Record | null>(null);
  const PAGE_WIDTH = Dimensions.get('window').width - 40;

  useEffect(() => {
    const fetchRecordDetails = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/myReviews/${id}`, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ACCESS_TOKEN`,
          },
        });
        setRecord(response.data);
      } catch (error) {
        console.error('Error', error);
      }
    };

    fetchRecordDetails();
  }, [id]);

  const renderItem = ({
    item,
  }: {
    item: {image: string; title: string; artist: string; memo: string};
  }) => (
    <View style={[{width: PAGE_WIDTH}]}>
      <Image source={{uri: item.image}} style={styles.imagePreview} />
      <Text style={[GlobalStyle.mainText, {marginBottom: 10}]}>
        {item.title}
      </Text>
      <Text
        style={[GlobalStyle.subText, {marginBottom: 7, fontWeight: 'regular'}]}>
        {item.artist}
      </Text>
      <Text
        style={[GlobalStyle.subText, {marginBottom: 7, fontWeight: 'regular'}]}>
        {item.memo}
      </Text>
    </View>
  );

  if (!record) {
    return (
      <View style={[GlobalStyle.container]}>
        <Text>Loading</Text>
      </View>
    );
  }

  const handleEdit = () => {
    if (record) {
      (navigation as any).navigate('Recording', {
        exhibitionName: record.name,
        exhibitionDate: record.date,
        gallery: record.gallery,
        artList: record.artList.map(art => ({
          image: art.image || null,
          title: art.title || null,
          artist: art.artist || null,
          memo: art.memo || null,
        })),
        mainImage: record.mainImage || null,
        isEditMode: true,
        artIndex: 0,
        myReviewsId: record.id,
      });
    }
  };

  return (
    <View style={[GlobalStyle.container]}>
      <ScrollView>
        <View>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackIcon
              name="chevron-back"
              size={24}
              color={'black'}
              style={{paddingRight: 3, paddingTop: 18}}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            paddingTop: 20,
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
          style={[GlobalStyle.activeButton, GlobalStyle.fullButton]}
          onPress={handleEdit}>
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
