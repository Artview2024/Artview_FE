import React from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import Text from '../components/Text';
import LocationPin from 'react-native-vector-icons/Ionicons';
import GlobalStyle from '../styles/GlobalStyle';

type Exhibition = {
  id: number;
  name: string;
  gallery?: string;
  image: any;
};

type RecordsProps = {
  exhibitions: Exhibition[];
  selectedExhibition: number | null;
  onExhibitionSelect: (id: number) => void;
  showGallery?: boolean;
};

export default function Records({
  exhibitions,
  selectedExhibition,
  onExhibitionSelect,
  showGallery = false,
}: RecordsProps) {
  return (
    <ScrollView>
      <View style={styles.exhibitionList}>
        {exhibitions.map(exhibition => (
          <View key={exhibition.id} style={styles.exhibitionWrapper}>
            <TouchableOpacity onPress={() => onExhibitionSelect(exhibition.id)}>
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
                {showGallery && exhibition.gallery && (
                  <View style={styles.infoRow}>
                    <LocationPin
                      name="location-outline"
                      size={15}
                      color="#000"
                    />
                    <Text style={GlobalStyle.subText}>
                      {exhibition.gallery}
                    </Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
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
    paddingBottom: 20,
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
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
});
