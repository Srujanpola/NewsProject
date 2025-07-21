import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useTranslation } from 'react-i18next';
import appMngr from '../appMngr';

const AccountScreen = () => {
  const { t } = useTranslation();
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await appMngr.userDetails();

      if (response.status === 200 && response.data) {
        setUserDetails(response.data.data);
        console.log(response.data.data);
      } else {
        setError(t('failed_to_fetch_user_details'));
      }
    } catch (err) {
      setError(t('network_error_occurred'));
      console.error('Error fetching user details:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={hp(5)} color="#007AFF" />
        <Text style={styles.loadingText}>{t('loading_user_details')}</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!userDetails) {
    return (
      <View style={styles.noDataContainer}>
        <Text style={styles.noDataText}>{t('no_user_details_found')}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.detailsContainer}>
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>{t('username')}</Text>
          <Text style={styles.fieldValue}>
            {userDetails.username || t('not_available')}
          </Text>
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>{t('email')}</Text>
          <Text style={styles.fieldValue}>
            {userDetails.email || t('not_available')}
          </Text>
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>{t('account_created_on')}</Text>
          <Text style={styles.fieldValue}>
            {userDetails.createdAt
              ? new Date(userDetails.createdAt).toLocaleDateString()
              : t('not_available')}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  detailsContainer: {
    padding: wp(5),
  },
  fieldContainer: {
    backgroundColor: '#fff',
    padding: wp(4),
    marginBottom: hp(1.5),
    borderRadius: wp(2),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  fieldLabel: {
    fontSize: wp(3.5),
    fontWeight: '600',
    color: '#666',
    marginBottom: hp(0.5),
  },
  fieldValue: {
    fontSize: wp(4),
    color: '#333',
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: hp(1.5),
    fontSize: wp(4),
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  errorText: {
    fontSize: wp(4),
    color: '#ff3b30',
    textAlign: 'center',
    padding: wp(5),
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  noDataText: {
    fontSize: wp(4),
    color: '#666',
    textAlign: 'center',
    padding: wp(5),
  },
});

export default AccountScreen;
