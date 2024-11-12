import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import Text from '../../components/Text';
import ExhibitionStatusButton from './ExhibitionStatusButton';
import Calendar from 'react-native-vector-icons/Ionicons';
import LocationPin from 'react-native-vector-icons/Ionicons';
import Time from 'react-native-vector-icons/Ionicons';

type ExhibitionSimpleInfoProps = {
  exhibitionData: any;
};

export default function ExhibitionSimpleInfo({
  exhibitionData,
}: ExhibitionSimpleInfoProps) {
  if (!exhibitionData || !exhibitionData.exhibitionInfo) {
    return <Text>전시 정보가 없습니다.</Text>;
  }

  const {mainImageUrl, title, startDate, finishDate, location} =
    exhibitionData.exhibitionInfo;

  return (
    <View style={styles.container}>
      <Image source={{uri: mainImageUrl}} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.infoRow}>
          <Calendar name="calendar-outline" size={15} color={'#000'} />
          <Text style={styles.subInfo}>
            {startDate} - {finishDate}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <LocationPin name="location-outline" size={15} color={'#000'} />
          <Text style={styles.subInfo}>{location}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 80,
    aspectRatio: 3 / 4,
    borderRadius: 8,
    marginRight: 16,
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000',
  },
  subInfo: {
    fontSize: 14,
    color: '#000',
    marginLeft: 4,
  },
  operatingHoursContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 2,
  },
  operatingHoursTextContainer: {
    marginLeft: 8,
  },
});
