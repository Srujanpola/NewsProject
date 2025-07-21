import React, { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { SparklesIcon } from 'react-native-heroicons/outline';
import { useDispatch } from 'react-redux';
import {
  setLanguage,
  setLocationRegional,
  setLocationEnglish,
} from '../redux/slices/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';
import TextAtom from '../atoms/TextAtom';
const SplashScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const AppStart = async () => {
    const language = await AsyncStorage.getItem('language');
    const locationRegional = await AsyncStorage.getItem('locationRegional');
    const locationEnglish = await AsyncStorage.getItem('locationEnglish');
    console.log('locationRegional', locationRegional);
    console.log('locationEnglish', locationEnglish);
    if (language) {
      dispatch(setLanguage(language));
      dispatch(setLocationRegional(JSON.parse(locationRegional)));
      dispatch(setLocationEnglish(JSON.parse(locationEnglish)));
    }
    const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
    const parsedData = JSON.parse(isLoggedIn);

    setTimeout(() => {
      if (parsedData) {
        navigation.replace('Main');
      } else {
        navigation.replace('Login');
      }
    }, 2000);
  };
  useEffect(() => {
    AppStart();
  }, []);
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../animations/bird.json')}
        autoPlay
        loop
        style={{ width: wp(100), height: hp(30) }}
      />
      <TextAtom style={styles.text}>Locono</TextAtom>
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
  text: {
    fontSize: wp(10),
    fontWeight: 'bold',
    color: '#FFD600',
    textShadowColor: '#000',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 2,
  },
});

export default SplashScreen;
