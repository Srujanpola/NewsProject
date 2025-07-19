import React, { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { SparklesIcon } from 'react-native-heroicons/outline';
import { useDispatch } from 'react-redux';
import { setLanguage } from '../redux/slices/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
const SplashScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const AppStart = async () => {
    const language = await AsyncStorage.getItem('language');
    if (language) {
      dispatch(setLanguage(language));
    }
    navigation.navigate('Main');
  };
  useEffect(() => {
    AppStart();
  }, []);
  return (
    <View style={styles.container}>
      <SparklesIcon color="#FFD600" size={wp(20)} />
      <ActivityIndicator
        size="large"
        color="#FFD600"
        style={{ marginTop: hp(4) }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default SplashScreen;
