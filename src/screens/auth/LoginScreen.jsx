import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import TextAtom from '../../atoms/TextAtom';
import InputAtom from '../../atoms/InputAtom';
import ButtonAtom from '../../atoms/ButtonAtom';
import appMngr from '../../appMngr';
import AsyncStorage from '@react-native-async-storage/async-storage';
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LoginScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showError, setShowError] = useState(true);
  const [errorText, setErrorText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const isValid = !formData.email || !formData.password;
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  useEffect(() => {
    if (showError) {
      setShowError(false);
      setErrorText('');
    }
  }, [formData]);

  const handleLogin = async () => {
    console.log('Login data:', formData);
    if (!emailRegex.test(formData.email)) {
      setShowError(true);
      setErrorText('Invalid email');
      return;
    }

    setIsLoading(true);
    try {
      const loginResponse = await appMngr.login(
        formData.email,
        formData.password,
      );

      if (loginResponse.status === 200) {
        await AsyncStorage.setItem('isLoggedIn', JSON.stringify(true));
        await AsyncStorage.setItem('email', formData.email);
        navigation.replace('Main');
      } else if (loginResponse.status === 401) {
        setShowError(true);
        setErrorText('Invalid email or password or user not avaliable');
      } else {
        setShowError(true);
        setErrorText('Something went wrong.Try After Few Minutes');
      }
    } catch (error) {
      setShowError(true);
      setErrorText('Network error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = () => {
    navigation.replace('SignUp');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#fff' }}
      behavior="padding"
    >
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <TextAtom style={styles.subtitle}>Sign in to continue</TextAtom>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <TextAtom style={styles.label}>Email</TextAtom>
            <InputAtom
              style={styles.input}
              placeholder="Enter your email"
              value={formData.email}
              onChangeText={value => handleInputChange('email', value)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <TextAtom style={styles.label}>Password</TextAtom>
            <InputAtom
              style={styles.input}
              placeholder="Enter your password"
              value={formData.password}
              onChangeText={value => handleInputChange('password', value)}
              secureTextEntry
            />
          </View>

          {showError && (
            <TextAtom
              style={{ color: 'red', fontSize: wp(3), fontWeight: 'bold' }}
            >
              {errorText}
            </TextAtom>
          )}
        </View>
        <ButtonAtom
          title="Login"
          onPress={handleLogin}
          style={[
            styles.loginButton,
            isValid && { backgroundColor: 'gray', opacity: 0.5 },
          ]}
          disabled={isValid || isLoading}
        />
        <View style={styles.signUpContainer}>
          <TextAtom style={styles.signUpText}>Don't have an account? </TextAtom>
          <ButtonAtom
            title="sign up"
            onPress={handleSignUp}
            style={styles.signUpButton}
            disabled={isLoading}
          />
        </View>

        {/* Loading Overlay */}
        {isLoading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size={hp(5)} color="#f9b233" />
            <TextAtom style={styles.loadingText}>Signing in...</TextAtom>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: wp(4),
    backgroundColor: '#fff', // changed to white
    justifyContent: 'center',
  },
  header: {
    marginBottom: hp(3),
    alignItems: 'center',
  },
  title: {
    fontSize: wp(8),
    fontWeight: 'bold',
    color: '#1A237E', // deep blue for professional look
    marginBottom: hp(1),
  },
  subtitle: {
    fontSize: wp(4.5),
    color: '#1A237E', // deep blue
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  form: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(4),
    backgroundColor: '#F5F7FA', // subtle off-white
    borderRadius: wp(5),
    elevation: 5,
    shadowColor: '#1A237E', // blue shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    gap: hp(3),
  },
  input: {
    elevation: 2,
    shadowColor: '#1A237E',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    backgroundColor: '#fff',
    borderRadius: wp(2),
    borderWidth: 1,
    borderColor: '#E3E6ED',
  },
  inputGroup: {
    marginBottom: hp(3),
  },
  label: {
    fontSize: wp(4),
    fontWeight: '600',
    color: '#374151', // dark gray
    marginBottom: hp(1),
  },
  loginButton: {
    marginTop: hp(5),
    marginBottom: hp(2),
    backgroundColor: '#F5F7FA', // deep blue
    borderRadius: wp(2),
    elevation: 2,
    shadowColor: '#1A237E',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(2),
  },
  signUpText: {
    fontSize: wp(4),
    color: '#374151', // dark gray
  },
  signUpButton: {
    backgroundColor: '#F5F7FA', // professional green
    fontSize: wp(4),
    color: '#fff',
    fontWeight: 'bold',
    paddingVertical: wp(1),
    paddingHorizontal: wp(3),
    borderRadius: wp(2),
    elevation: 2,
    shadowColor: '#43A047',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    height: hp(100),
    backgroundColor: 'rgba(26, 35, 126, 0.08)', // blue tint
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  loadingText: {
    marginTop: hp(2),
    fontSize: wp(4),
    color: '#1A237E',
    fontWeight: '600',
  },
});

export default LoginScreen;
