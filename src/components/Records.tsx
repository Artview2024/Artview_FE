import React from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import BackIcon from 'react-native-vector-icons/Ionicons';
import GlobalStyle from '../styles/GlobalStyle';

type Exhibition = {
  id: number;
  name: string;
  date: string;
  image: any;
};

type RecordsProps = {
  exhibitions: Exhibition[];
  selectedExhibition: number | null;
  onExhibitionSelect: (id: number) => void;
  backAction: () => void;
};

export default function Records({
  exhibitions,
  selectedExhibition,
  onExhibitionSelect,
  backAction,
}: RecordsProps) {
  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
          <TouchableOpacity onPress={backAction}>
            <BackIcon
              name="chevron-back"
              size={24}
              color={'black'}
              style={{paddingRight: 3, paddingTop: 18, paddingLeft: 0}}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.exhibitionList}>
          {exhibitions.map(exhibition => (
            <View key={exhibition.id} style={styles.exhibitionWrapper}>
              <TouchableOpacity
                onPress={() => onExhibitionSelect(exhibition.id)}>
                <Image
                  source={exhibition.image}
                  style={[
                    styles.exhibitionImage,
                    selectedExhibition === exhibition.id &&
                      styles.selectedExhibitionImage,
                  ]}
                />
                <View style={{paddingTop: 7}}>
                  <Text style={GlobalStyle.mainText}>{exhibition.name}</Text>
                  <Text style={GlobalStyle.subText}>{exhibition.date}</Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  exhibitionList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  exhibitionWrapper: {
    width: '48%',
    paddingTop: 10,
    marginVertical: 10,
  },
  exhibitionImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 3 / 4,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  selectedExhibitionImage: {
    opacity: 0.6,
  },
});
