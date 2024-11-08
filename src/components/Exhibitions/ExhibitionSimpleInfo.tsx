import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import Text from '../../components/Text';
import ExhibitionStatusButton from './ExhibitionStatusButton';
import Calendar from 'react-native-vector-icons/AntDesign';
import LocationPin from 'react-native-vector-icons/EvilIcons';
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

  const {mainImageUrl, title, startDate, finishDate, location, operatingHours} =
    exhibitionData.exhibitionInfo;

  return (
    <View style={styles.container}>
      <Image source={{uri: mainImageUrl}} style={styles.image} />
      <View style={styles.infoContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          <ExhibitionStatusButton status="전시중" />
        </View>
        <Text style={styles.subInfo}>
          <Calendar name="calendar" size={15} />
          &nbsp; {startDate} ~ {finishDate}
        </Text>
        <Text style={styles.subInfo}>
          <LocationPin name="location" size={15} />
          &nbsp; {location}
        </Text>
        {operatingHours && (
          <View>
            {operatingHours.map((hour: string, index: number) => (
              <Text key={index} style={styles.subInfo}>
                <Time name="time-outline" size={15} />
                &nbsp; {hour}
              </Text>
            ))}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    marginBottom: 4,
  },
});
