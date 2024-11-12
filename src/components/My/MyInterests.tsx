import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import InterestButton from '../My/InterestButton';
import Text from '../Text';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {StackParamList} from '../../navigator/StackParamList';

interface MyInterestsProps {
  interests: string[];
}

const MyInterests: React.FC<MyInterestsProps> = ({interests = []}) => {
  const navigation = useNavigation<NavigationProp<StackParamList>>();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.headerContainer}
        onPress={() =>
          navigation.navigate('InterestSelection', {userInterest: interests})
        }>
        <Text style={styles.headerText}>관심 분야</Text>
      </TouchableOpacity>
      <View style={styles.buttonsContainer}>
        {interests.map((interest: string, index: number) => (
          <InterestButton key={index} title={interest} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 20,
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingVertical: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingRight: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
});

export default MyInterests;
