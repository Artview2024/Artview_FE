import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import Text from '../../components/Text';
import GlobalStyle from '../../styles/GlobalStyle';
import Calendar from 'react-native-vector-icons/Ionicons';
import LocationPin from 'react-native-vector-icons/Ionicons';
import Time from 'react-native-vector-icons/Ionicons';

const ExhibitionInfo = ({exhibitionData}: {exhibitionData: any}) => {
  if (!exhibitionData || !exhibitionData.exhibitionInfo) {
    return <Text>전시 정보가 없습니다.</Text>;
  }

  const {mainImageUrl, title, startDate, finishDate, location} =
    exhibitionData.exhibitionInfo;

  const {locationLink, operatingHours} = exhibitionData;

  const openLocationLink = () => {
    if (locationLink) {
      if (locationLink.startsWith('http') || locationLink.startsWith('https')) {
        Linking.openURL(locationLink).catch(err => {
          console.error('Failed to open URL:', err);
          Alert.alert(
            '오류',
            'URL을 열 수 없습니다. 외부 브라우저에서 시도해 주세요.',
          );
        });
      } else {
        console.error('Invalid URL scheme:', locationLink);
        Alert.alert('오류', 'URL 스키마가 유효하지 않습니다.');
      }
    }
  };

  return (
    <View>
      <Image source={{uri: mainImageUrl}} style={styles.poster} />
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subInfo}>
          <Calendar name="calendar-outline" size={15} />
          &nbsp; {startDate} ~ {finishDate}
        </Text>
        <Text style={styles.subInfo}>
          <LocationPin name="location-outline" size={15} />
          &nbsp; {location}
        </Text>
        {operatingHours && operatingHours.length > 0 && (
          <View style={styles.operatingHoursContainer}>
            <Time name="time-outline" size={15} color={'#000'} />
            <View style={styles.operatingHoursTextContainer}>
              {operatingHours.map((hour: string, index: number) => (
                <Text key={index} style={styles.subInfo}>
                  {hour}
                </Text>
              ))}
            </View>
          </View>
        )}
      </View>

      <TouchableOpacity
        style={[
          GlobalStyle.fullButton,
          {backgroundColor: '#000', marginTop: 20, paddingHorizontal: 0},
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
  operatingHoursContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 2,
  },
  operatingHoursTextContainer: {
    marginLeft: 8,
  },
  buttonText: {
    fontSize: 14,
    color: '#fff',
  },
});

export default ExhibitionInfo;
