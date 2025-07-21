import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import TextAtom from '../../atoms/TextAtom';
import InputAtom from '../../atoms/InputAtom';
import ButtonAtom from '../../atoms/ButtonAtom';
import AsyncStorage from '@react-native-async-storage/async-storage';
import appMngr from '../../appMngr';
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SignUpScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [showErrror, setShowError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const isValid =
    !formData.name ||
    !formData.email ||
    !formData.password ||
    !formData.confirmPassword;
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    let valid = true;
    let newErrors = {};
    if (formData.name.length < 3 || formData.name.length > 30) {
      newErrors.name = 'Name must be at least 3 to 30 characters';
      valid = false;
    }
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email address';
      valid = false;
    }
    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };

  const handleSignUp = async () => {
    if (validate()) {
      console.log('Sign up data:', formData);
      setIsLoading(true);
      try {
        const signUpResponse = await appMngr.signUp(
          formData.name,
          formData.email,
          formData.password,
        );
        if (signUpResponse.status === 201) {
          await AsyncStorage.setItem('isLoggedIn', JSON.stringify(true));
          await AsyncStorage.setItem('email', formData.email);
          navigation.replace('Main');
        } else if (signUpResponse.status === 400) {
          setShowError(true);
          setErrorText('Entered Details are Not Valid');
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
    }
  };

  const handleLogin = () => {
    navigation.replace('Login');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#fff' }}
      behavior={'padding'}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: wp(4), flex: 1 }}
        contentContainerStyle={{ paddingTop: hp(10) }}
      >
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <TextAtom style={styles.subtitle}>Create your account</TextAtom>
          </View>
          {/* Form */}
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <TextAtom style={styles.label}>Full Name</TextAtom>
              <InputAtom
                placeholder="Enter your full name"
                value={formData.name}
                onChangeText={value => handleInputChange('name', value)}
                autoCapitalize="words"
              />
            </View>
            <View style={styles.inputGroup}>
              <TextAtom style={styles.label}>Email</TextAtom>
              <InputAtom
                placeholder="Enter your email"
                value={formData.email}
                onChangeText={value => handleInputChange('email', value)}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {errors.email ? (
                <TextAtom
                  style={{ color: 'red', fontSize: wp(3), marginTop: 2 }}
                >
                  {errors.email}
                </TextAtom>
              ) : null}
            </View>
            <View style={styles.inputGroup}>
              <TextAtom style={styles.label}>Password</TextAtom>
              <InputAtom
                placeholder="Enter your password"
                value={formData.password}
                onChangeText={value => handleInputChange('password', value)}
                secureTextEntry
              />
              {errors.password ? (
                <TextAtom
                  style={{ color: 'red', fontSize: wp(3), marginTop: 2 }}
                >
                  {errors.password}
                </TextAtom>
              ) : null}
            </View>
            <View style={styles.inputGroup}>
              <TextAtom style={styles.label}>Confirm Password</TextAtom>
              <InputAtom
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChangeText={value =>
                  handleInputChange('confirmPassword', value)
                }
                secureTextEntry
              />
              {errors.confirmPassword ? (
                <TextAtom
                  style={{ color: 'red', fontSize: wp(3), marginTop: 2 }}
                >
                  {errors.confirmPassword}
                </TextAtom>
              ) : null}
              {showErrror && (
                <TextAtom
                  style={{
                    color: 'red',
                    fontSize: wp(3),
                    marginTop: 2,
                    fontWeight: 'bold',
                  }}
                >
                  {errorText}
                </TextAtom>
              )}
            </View>
          </View>
          <ButtonAtom
            title="Sign Up"
            onPress={handleSignUp}
            style={[
              styles.signUpButton,
              isValid && { backgroundColor: 'gray', opacity: 0.5 },
            ]}
            disabled={isValid || isLoading}
          />
          <View style={styles.loginContainer}>
            <TextAtom style={styles.loginText}>
              Already have an account?{' '}
            </TextAtom>
            <ButtonAtom
              title="login"
              onPress={handleLogin}
              style={styles.loginLink}
              disabled={isLoading}
            />
          </View>
        </View>
      </ScrollView>
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size={hp(5)} color="#1A237E" />
          <TextAtom style={styles.loadingText}>Creating account...</TextAtom>
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  content: {
    backgroundColor: '#fff',
  },
  header: {
    marginBottom: hp(3),
    alignItems: 'center',
  },
  title: {
    fontSize: wp(8),
    fontWeight: 'bold',
    color: '#1A237E', // deep blue for professional look
    marginBottom: hp(.5),
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
    gap: hp(1),
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
  signUpButton: {
    marginTop: hp(3.5),
    marginBottom: hp(2),
    backgroundColor: '#F5F7FA',
    borderRadius: wp(2),
    elevation: 2,
    shadowColor: '#1A237E',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(2),
  },
  loginText: {
    fontSize: wp(4),
    color: '#374151', // dark gray
  },
  loginLink: {
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

export default SignUpScreen;
