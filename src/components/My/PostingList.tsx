import React from 'react';
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Text from '../../components/Text';

interface Posting {
  id: number;
  name: string;
  date: string;
  image: any;
}

interface PostingListProps {
  postings: Posting[];
}

const PostingList: React.FC<PostingListProps> = ({postings}) => (
  <View style={styles.postingList}>
    {postings.map(posting => (
      <View key={posting.id} style={styles.postingWrapper}>
        <TouchableOpacity>
          <Image source={posting.image} style={styles.postingImage} />
          <View style={{paddingTop: 7}}>
            <Text style={styles.postingName}>{posting.name}</Text>
            <Text style={styles.postingDate}>{posting.date}</Text>
          </View>
        </TouchableOpacity>
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  postingList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  postingWrapper: {width: '46%', marginVertical: 10},
  postingImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 3 / 4,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  postingName: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'medium',
  },
  postingDate: {
    fontSize: 14,
    color: 'black',
  },
});

export default PostingList;
