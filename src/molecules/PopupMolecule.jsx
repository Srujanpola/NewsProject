import React from 'react';
import { Modal, View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import TextAtom from '../atoms/TextAtom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '../redux/slices/userSlice';

const languages = [
  { code: 'en', name: 'English', flag: '🇮🇳' },
  { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
  { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
  { code: 'kn', name: 'ಕನ್ನಡ', flag: '🇮🇳' },
  { code: 'ml', name: 'മലയാളം', flag: '🇮🇳' },
  { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
];

const PopupMolecule = ({ visible, onClose }) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const currentLanguage = useSelector(state => state.user.language);

  const handleLanguageSelect = async (languageCode) => {
    try {
      dispatch(setLanguage(languageCode));
      await i18n.changeLanguage(languageCode);
      onClose();
    } catch (error) {
      console.log('Error changing language:', error);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.popup}>
          <View style={styles.header}>
            <TextAtom style={styles.title}>{t('select_language')}</TextAtom>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <TextAtom style={styles.closeText}>✕</TextAtom>
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.languageList}>
            {languages.map((lang) => (
              <TouchableOpacity
                key={lang.code}
                style={[
                  styles.languageItem,
                  currentLanguage === lang.code && styles.selectedLanguage
                ]}
                onPress={() => handleLanguageSelect(lang.code)}
              >
                <TextAtom style={styles.flag}>{lang.flag}</TextAtom>
                <TextAtom style={[
                  styles.languageName,
                  currentLanguage === lang.code && styles.selectedLanguageText
                ]}>
                  {lang.name}
                </TextAtom>
                {currentLanguage === lang.code && (
                  <TextAtom style={styles.checkmark}>✓</TextAtom>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    backgroundColor: '#fff',
    borderRadius: wp(4),
    width: wp(80),
    maxHeight: hp(70),
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  title: {
    fontSize: wp(5),
    fontWeight: 'bold',
    color: '#181A20',
  },
  closeButton: {
    padding: wp(2),
  },
  closeText: {
    fontSize: wp(5),
    color: '#A0A0A0',
  },
  languageList: {
    paddingHorizontal: wp(2),
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(2),
    paddingHorizontal: wp(3),
    borderRadius: wp(2),
    marginVertical: hp(0.5),
  },
  selectedLanguage: {
    backgroundColor: '#FFD600',
  },
  flag: {
    fontSize: wp(6),
    marginRight: wp(3),
  },
  languageName: {
    flex: 1,
    fontSize: wp(4),
    color: '#181A20',
  },
  selectedLanguageText: {
    fontWeight: 'bold',
  },
  checkmark: {
    fontSize: wp(4),
    color: '#181A20',
    fontWeight: 'bold',
  },
});

export default PopupMolecule; 