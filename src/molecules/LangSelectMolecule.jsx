import React, { useState, useRef, useMemo } from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import TextAtom from '../atoms/TextAtom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  setLanguage,
  setLocationRegional,
  setLocationEnglish,
} from '../redux/slices/userSlice';
import stateDistrict from '../data/stateDistrict.json';
const states = stateDistrict;

const LangSelectMolecule = ({ visible, onClose }) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const currentLanguage = useSelector(state => state.user.language);
  const statesList = Object.keys(states);
  const [districtList, setDistrictList] = useState([]);
  const [selectedState, setSelectedState] = useState(null);
  const [OnSelctedState, setOnSelectedState] = useState(false);
  const handleStateSelect = async state => {
    try {
      const stateData = states[state];
      dispatch(setLanguage(stateData.languageCode));
      setSelectedState({
        engWord: stateData.engWord,
        regionalWord: state,
        languageCode: stateData.languageCode,
      });
      setOnSelectedState(true);
      const districtList = stateData.districts;
      setDistrictList(districtList);
      await i18n.changeLanguage(stateData.languageCode);
    } catch (error) {
      console.log('Error changing language:', error);
    }
  };

  const handleDistrictSelect = async district => {
    dispatch(
      setLocationRegional({
        state: selectedState.regionalWord,
        district: district.regional,
      }),
    );
    dispatch(
      setLocationEnglish({
        state: selectedState.engWord,
        district: district.engWord,
      }),
    );
    setOnSelectedState(false);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      onRequestClose={onClose}
      transparent={true}
      animationType="fade"
    >
      <View style={styles.overlay}>
        <View style={styles.popup}>
          <View style={styles.header}>
            <TextAtom style={styles.title}>{t('select_location')}</TextAtom>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <TextAtom style={styles.closeText}>✕</TextAtom>
            </TouchableOpacity>
          </View>

          {!OnSelctedState && (
            <FlatList
              data={statesList}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.languageItem,
                    // currentLanguage === lang.code && styles.selectedLanguage,
                  ]}
                  onPress={() => handleStateSelect(item)}
                >
                  <TextAtom
                    style={[
                      styles.languageName,
                      selectedState === item && styles.selectedLanguageText,
                    ]}
                  >
                    {item}
                  </TextAtom>
                </TouchableOpacity>
              )}
              style={styles.languageList}
            />
          )}
          {OnSelctedState && (
            <FlatList
              data={districtList}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.languageItem,
                    // currentLanguage === lang.code && styles.selectedLanguage,
                  ]}
                  onPress={() => handleDistrictSelect(item)}
                >
                  <TextAtom
                    style={[
                      styles.languageName,
                      //selectedState === state && styles.selectedLanguageText,
                    ]}
                  >
                    {item.regional}
                  </TextAtom>
                </TouchableOpacity>
              )}
              style={styles.languageList}
            />
          )}
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

export default LangSelectMolecule;
