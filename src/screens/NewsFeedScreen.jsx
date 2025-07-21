import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import TextAtom from '../atoms/TextAtom';
import NewsCardMolecule from '../molecules/NewsCardMolecule';
import { useTranslation } from 'react-i18next';
import useNewsDataApiClient from 'newsdataapi';
import { NEWS_API_KEY } from '../utils/constants';
import { useSelector } from 'react-redux';

const NewsFeedScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const [newsData, setNewsData] = useState([]);
  const { latest } = useNewsDataApiClient(NEWS_API_KEY);
  const { language, locationEnglish } = useSelector(state => state.user);
  const [didFethched, setDidFetched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const newsCache = useRef({});
  console.log('language', language);

  useEffect(() => {
    console.log('fetching news');
    if (newsCache.current[locationEnglish.district]) {
      setNewsData(newsCache.current[locationEnglish.district]);
    } else {
      fetchNews();
    }
  }, [language, locationEnglish]);

  useEffect(() => {
    console.log('isRefreshing', isRefreshing);
  }, [isRefreshing]);

  const fetchNews = async (isRefreshing = false) => {
    try {
      if (!isRefreshing) {
        setIsLoading(true);
      }
      const response = await latest({
        country: 'in',
        language: language,
        q: locationEnglish.district,
        //category: 'business',
      });
      console.log('response', response);
      newsCache.current = {
        ...newsCache.current,
        [locationEnglish.district]: response.results,
      };
      setNewsData(response.results);
      setIsLoading(false);
      if (!didFethched) {
        setDidFetched(true);
      }
      if (isRefreshing) {
        setIsRefreshing(false);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleNewsPress = news => {
    console.log('news', news);
    navigation.navigate('NewsDisplay', {
      news,
    });
  };

  const renderNewsItem = ({ item }) => (
    <NewsCardMolecule
      image={item.image_url}
      title={item.title}
      onPress={() => handleNewsPress(item)}
    />
  );

  const keyExtractor = item =>
    item.article_id?.toString() || Math.random().toString();

  const ListHeaderComponent = () => (
    <View style={styles.titleContainer}>
      <TextAtom style={styles.newsTitle}>{t('news_title')}</TextAtom>
    </View>
  );

  return (
    <View style={styles.container}>
      {newsData.length > 0 ? (
        <FlatList
          data={newsData}
          renderItem={renderNewsItem}
          keyExtractor={keyExtractor}
          ListHeaderComponent={ListHeaderComponent}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={() => {
                setIsRefreshing(true);
                fetchNews(true);
              }}
              colors={['#FFD600']}
              progressBackgroundColor="#fff"
              tintColor="#FFD600"
              title="Pull to refresh"
            />
          }
        />
      ) : (
        <>
          {didFethched && (
            <View style={styles.titleContainer}>
              <TextAtom style={styles.newsTitle}>{t('no_news_found')}</TextAtom>
            </View>
          )}
        </>
      )}
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={hp(5)} color="#f9b233" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    paddingBottom: hp(2),
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp(2),
    paddingHorizontal: wp(4),
  },
  newsTitle: {
    fontSize: wp(6),
    fontWeight: 'bold',
    color: '#181A20',
    textAlign: 'center',
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(18, 17, 17, 0.5)',
    zIndex: 1000,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NewsFeedScreen;
