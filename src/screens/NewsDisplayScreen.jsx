import React from 'react';
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import TextAtom from '../atoms/TextAtom';
import { ArrowLeftIcon } from 'react-native-heroicons/outline';
import { useTranslation } from 'react-i18next';
const NewsDisplayScreen = ({ route, navigation }) => {
  const { t } = useTranslation();
  const { image, title, description } = route.params || {};

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <ArrowLeftIcon color="#181A20" size={wp(6)} />
        </TouchableOpacity>
        <TextAtom style={styles.headerTitle}>{t('news_label')}</TextAtom>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* News Image */}
        <Image
          source={{ uri: image }}
          style={styles.newsImage}
          resizeMode="cover"
        />

        {/* News Content */}
        <View style={styles.content}>
          <TextAtom style={styles.newsTitle}>{title}</TextAtom>

          <TextAtom style={styles.newsContent}>{description}</TextAtom>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(4),
    paddingVertical: hp(0.5),
    paddingTop: hp(4),
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    backgroundColor: '#fff',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  backButton: {
    padding: wp(2),
  },
  headerTitle: {
    fontSize: wp(5),
    fontWeight: 'bold',
    color: '#181A20',
  },
  placeholder: {
    width: wp(10),
  },
  scrollView: {
    flex: 1,
  },
  newsImage: {
    width: '90%',
    height: hp(30),
    margin: hp(2),
    borderRadius: wp(5),
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  content: {
    padding: wp(4),
  },
  newsTitle: {
    fontSize: wp(6),
    fontWeight: 'bold',
    color: '#181A20',
    marginBottom: hp(2),
    lineHeight: wp(7),
  },
  newsContent: {
    fontSize: wp(4),
    color: '#666',
    lineHeight: wp(6),
  },
});

export default NewsDisplayScreen;
