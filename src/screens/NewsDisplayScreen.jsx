import React from 'react';
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
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
  const { news } = route.params || {};
  const { image_url, title, description, category, source_name, link } = news;

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
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* News Card */}
        <View style={styles.card}>
          {/* News Image */}
          <Image
            source={{ uri: image_url }}
            style={styles.newsImage}
            resizeMode="cover"
          />

          {/* News Content */}
          <View style={styles.content}>
            <TextAtom style={styles.newsTitle}>{title}</TextAtom>
            {/* Category and Source */}
            <View style={styles.metaRow}>
              {category ? (
                <TextAtom style={styles.category}>{category}</TextAtom>
              ) : null}
              {source_name ? (
                <TouchableOpacity
                  style={styles.source}
                  onPress={() => Linking.openURL(link)}
                >
                  <TextAtom style={styles.sourceText}>{source_name}</TextAtom>
                </TouchableOpacity>
              ) : null}
            </View>
            <TextAtom style={styles.newsContent}>{description}</TextAtom>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
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
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  backButton: {
    padding: wp(2),
  },
  headerTitle: {
    fontSize: wp(5),
    fontWeight: 'bold',
    color: '#181A20',
    letterSpacing: 0.5,
  },
  placeholder: {
    width: wp(10),
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: hp(5),
    paddingBottom: hp(3),
    alignItems: 'center',
    minHeight: hp(80),
  },
  card: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: wp(4),
    elevation: 6,
    shadowColor: '#1A237E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    marginBottom: hp(2),
    alignItems: 'center',
    paddingBottom: hp(4),
    gap: wp(5),
  },
  newsImage: {
    width: '90%',
    height: hp(25),
    marginTop: hp(2),
    borderRadius: wp(3),
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  content: {
    width: '90%',
    paddingTop: hp(2),
    alignSelf: 'center',
    gap: wp(2),
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(1.2),
    gap: wp(3),
  },
  category: {
    fontSize: wp(3.5),
    color: '#43A047',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: wp(2),
    paddingVertical: hp(0.3),
    borderRadius: wp(1.5),
    fontWeight: '600',
    overflow: 'hidden',
  },
  source: {
    backgroundColor: '#E3E6ED',
    paddingHorizontal: wp(2),
    paddingVertical: hp(0.3),
    borderRadius: wp(1.5),
    overflow: 'hidden',
  },
  sourceText: {
    color: '#1A237E',
    fontSize: wp(3.5),
    fontWeight: '600',
  },
  newsTitle: {
    fontSize: wp(6),
    fontWeight: 'bold',
    color: '#1A237E',
    marginBottom: hp(1.5),
    lineHeight: wp(7),
    textAlign: 'left',
    letterSpacing: 0.2,
  },
  newsContent: {
    fontSize: wp(4.2),
    color: '#374151',
    lineHeight: wp(6),
    textAlign: 'left',
  },
});

export default NewsDisplayScreen;
