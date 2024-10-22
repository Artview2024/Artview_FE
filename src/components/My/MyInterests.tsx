import React from 'react';
import {View, StyleSheet} from 'react-native';
import InterestButton from '../My/InterestButton';
import Text from '../Text';

interface MyInterestsProps {
  interests: string[];
}

const MyInterests: React.FC<MyInterestsProps> = ({interests}) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>관심 분야</Text>
        <Text style={styles.headerText}>&gt;</Text>
      </View>
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
