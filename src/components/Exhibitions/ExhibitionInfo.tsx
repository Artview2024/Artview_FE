import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity, Linking} from 'react-native';
import Text from '../../components/Text';
import GlobalStyle from '../../styles/GlobalStyle';
import Calendar from 'react-native-vector-icons/AntDesign';
import LocationPin from 'react-native-vector-icons/EvilIcons';
import Time from 'react-native-vector-icons/Ionicons';

const ExhibitionInfo = ({exhibitionData}: {exhibitionData: any}) => {
  if (!exhibitionData || !exhibitionData.exhibitionInfo) {
    return <Text>Exhibition information is not available</Text>;
  }

  const {
    mainImageUrl,
    title,
    startDate,
    finishDate,
    location,
    operatingHours,
    locationLink,
  } = exhibitionData.exhibitionInfo;

  const openLocationLink = () => {
    if (locationLink) {
      Linking.openURL(locationLink).catch(err =>
        console.error('Failed to open URL:', err),
      );
    }
  };

  return (
    <View>
      <Image source={{uri: mainImageUrl}} style={styles.poster} />
      <View>
        <Text style={styles.title}>{title}</Text>
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

      <TouchableOpacity
        style={[
          GlobalStyle.fullButton,
          {backgroundColor: '#000', marginTop: 20},
        ]}
        onPress={openLocationLink}>
        <Text style={styles.buttonText}>위치 확인하기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  poster: {
    width: '100%',
    aspectRatio: 3 / 4,
    resizeMode: 'cover',
    marginBottom: 16,
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
  description: {
    fontSize: 14,
    color: '#000',
    marginTop: 10,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 14,
    color: '#fff',
  },
});

export default ExhibitionInfo;
