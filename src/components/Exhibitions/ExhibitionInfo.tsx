import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Text from '../../components/Text';
import GlobalStyle from '../../styles/GlobalStyle';

const ExhibitionInfo = () => {
  return (
    <View>
      <Image
        source={require('../../assets/images/thumbnail_basic.png')}
        style={styles.poster}
      />
      <View>
        <Text style={styles.title}>요시고 사진전</Text>
        <Text style={styles.subInfo}>📅 2024.04.02~07.11</Text>
        <Text style={styles.subInfo}>📍 갤러리 인테그랄</Text>
        <Text style={styles.subInfo}>🕒 월, 화, 수, 목 10:00 - 17:30</Text>
      </View>

      <Text style={styles.description}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has
      </Text>

      <TouchableOpacity
        style={[GlobalStyle.fullButton, {backgroundColor: '#000'}]}>
        <Text style={styles.buttonText}>웹사이트 방문</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  poster: {
    width: '100%',
    height: 200,
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
