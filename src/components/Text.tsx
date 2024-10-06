import React from 'react';
import {Text as RNText, TextProps} from 'react-native';

const Text: React.FC<TextProps> = props => {
  return (
    <RNText style={[{color: '#000'}, props.style]}>{props.children}</RNText>
  );
};

export default Text;
