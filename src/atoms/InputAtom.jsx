import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const InputAtom = ({ style, ...props }) => (
  <TextInput
    style={[styles.input, style]}
    placeholderTextColor="#888"
    {...props}
  />
);

const styles = StyleSheet.create({
  input: {
    fontSize: wp(4),
    paddingVertical: hp(1.2),
    paddingHorizontal: wp(3),
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: wp(2),
    backgroundColor: '#fff',
    color: '#181A20',
  },
});

export default InputAtom; 