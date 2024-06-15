import React, {useRef} from 'react';
import {View, Text, ScrollView} from 'react-native';
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
