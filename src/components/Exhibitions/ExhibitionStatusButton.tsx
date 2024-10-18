import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import Text from '../Text';

type Props = {
  status: string;
};

export default function ExhibitionStatusButton({status}: Props) {
  return (
    <TouchableOpacity style={styles.statusButton}>
      <Text style={styles.statusText}>{status}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  statusButton: {
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  statusText: {
    fontSize: 12,
    color: '#000',
  },
});
