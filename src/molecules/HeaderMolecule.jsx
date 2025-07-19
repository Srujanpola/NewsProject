import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import TextAtom from '../atoms/TextAtom';
import {
  ChevronDownIcon,
  UserCircleIcon,
} from 'react-native-heroicons/outline';
import { useTranslation } from 'react-i18next';
const HeaderMolecule = ({ onLocationPress, onProfilePress }) => {
  const { t } = useTranslation();
  return (
    <View style={styles.header}>
      <View style={styles.leftSection}>
        <TouchableOpacity
          style={styles.locationContainer}
          onPress={onLocationPress}
        >
          <TextAtom style={styles.locationText}>
            {t('select_language')}
          </TextAtom>
          <ChevronDownIcon color="#181A20" size={wp(4)} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: wp(4),
    paddingTop: hp(6),
    paddingBottom: hp(2),
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    elevation: 2,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: wp(7),
    height: wp(7),
    resizeMode: 'contain',
    marginRight: wp(2),
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    borderRadius: wp(2),
    paddingHorizontal: wp(2),
    paddingVertical: hp(0.5),
  },
  locationText: {
    fontSize: wp(4),
    color: '#181A20',
    marginRight: wp(1),
    fontWeight: 'bold',
  },
  profileIcon: {
    marginLeft: wp(2),
  },
});

export default HeaderMolecule;
