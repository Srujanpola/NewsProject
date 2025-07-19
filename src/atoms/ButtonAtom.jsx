import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const ButtonAtom = ({ title, onPress, style, textStyle, ...props }) => (
  <TouchableOpacity style={[styles.button, style]} onPress={onPress} {...props}>
    <Text style={[styles.text, textStyle]}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(5),
    borderRadius: wp(2),
    backgroundColor: '#FFD600',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: wp(4),
    color: '#181A20',
    fontWeight: 'bold',
  },
});

export default ButtonAtom; 