import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Text from '../../components/Text';
import ExhibitionStatusButton from './ExhibitionStatusButton';

export default function ExhibitionSimpleInfo() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/recommend1.png')}
        style={styles.image}
      />
      <View style={styles.infoContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>요시고 사진전</Text>
          <ExhibitionStatusButton status="전시중" />
        </View>
        <Text style={styles.subInfo}>📅 2024.04.02~07.11</Text>
        <Text style={styles.subInfo}>📍 갤러리 인테그랄</Text>
        <Text style={styles.subInfo}>🕒 월, 화, 수, 목 10:00 - 17:30</Text>
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
