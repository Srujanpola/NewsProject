import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import TextAtom from '../atoms/TextAtom';

const NewsCardMolecule = ({ 
  image, 
  title, 
  onPress, 
  style 
}) => {
  return (
    <TouchableOpacity style={[styles.card, style]} onPress={onPress}>
      <Image 
        source={{ uri: image }} 
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <TextAtom style={styles.title} numberOfLines={2}>
          {title}
        </TextAtom>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: wp(3),
    marginHorizontal: wp(4),
    marginVertical: hp(1),
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: hp(20),
  },
  content: {
    padding: wp(3),
  },
  title: {
    fontSize: wp(4),
    fontWeight: '600',
    color: '#181A20',
    lineHeight: wp(5),
  },
});

export default NewsCardMolecule; 