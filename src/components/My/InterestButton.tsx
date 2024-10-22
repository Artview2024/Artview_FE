import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import Text from '../Text';

interface InterestButtonProps {
  title: string;
}

const InterestButton: React.FC<InterestButtonProps> = ({title}) => {
  return (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 6,
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'black',
  },
  text: {
    color: 'black',
    fontSize: 12,
  },
});

export default InterestButton;
