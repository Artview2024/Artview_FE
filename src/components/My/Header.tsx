import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Text from '../Text';
import {useNavigation} from '@react-navigation/native';
import BackIcon from 'react-native-vector-icons/Ionicons';

const Header = ({
  title,
  onBackPress,
}: {
  title: string;
  onBackPress?: () => void;
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        onPress={() => (onBackPress ? onBackPress() : navigation.goBack())}
        style={styles.backButton}>
        <BackIcon name="chevron-back" size={24} color={'black'} />
      </TouchableOpacity>
      <View style={styles.userNameContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.rightSpace} />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
  },
  backButton: {
    width: 40,
  },
  userNameContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  rightSpace: {
    width: 40,
  },
});

export default Header;
