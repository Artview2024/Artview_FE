import React, {useRef} from 'react';
import {View, ScrollView} from 'react-native';
import Text from '../components/Text';
import {useScrollToTop} from '@react-navigation/native';

export default function ExhibitionsScreen() {
  const ref = useRef(null);
  useScrollToTop(ref);

  return (
    <View>
      <ScrollView ref={ref}>
        <Text>Exhibition Screen</Text>
      </ScrollView>
    </View>
  );
}
