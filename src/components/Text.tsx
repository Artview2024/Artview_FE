import React from 'react';
import {Text as RNText, TextProps} from 'react-native';

const Text = (props: TextProps) => (
  <RNText {...props} allowFontScaling={false}>
    {props.children}
  </RNText>
);

export default Text;
