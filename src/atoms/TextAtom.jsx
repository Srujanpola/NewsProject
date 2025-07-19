import React from 'react';
import { Text } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const TextAtom = ({ children, style, ...props }) => (
  <Text style={[{ fontSize: wp(4) }, style]} {...props}>
    {children}
  </Text>
);

export default TextAtom; 