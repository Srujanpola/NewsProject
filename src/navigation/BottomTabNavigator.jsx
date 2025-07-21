import React, { useState } from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NewsFeedScreen from '../screens/NewsFeedScreen';
import AccountScreen from '../screens/AccountScreen';
import BottomTabBarMolecule from '../molecules/BottomTabBarMolecule';
import HeaderMolecule from '../molecules/HeaderMolecule';
import LangSelectMolecule from '../molecules/LangSelectMolecule';
import { useSelector } from 'react-redux';

const BottomTab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const location = useSelector(state => state.user.location);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleLocationPress = () => {
    setIsPopupVisible(true);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderMolecule
        location={location || 'సంగారెడ్డి జిల్లా'}
        onLocationPress={handleLocationPress}
        onProfilePress={() => {}}
      />
      <View style={styles.content}>
        <BottomTab.Navigator
          tabBar={props => <BottomTabBarMolecule {...props} />}
          initialRouteName="NewsFeed"
          screenOptions={{ headerShown: false }}
        >
          <BottomTab.Screen
            name="NewsFeed"
            component={NewsFeedScreen}
            options={{ title: 'News' }}
          />
          <BottomTab.Screen
            name="AccountScreen"
            component={AccountScreen}
            options={{ title: 'Upload' }}
          />
        </BottomTab.Navigator>
      </View>

      <LangSelectMolecule visible={isPopupVisible} onClose={handleClosePopup} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
});

export default BottomTabNavigator;
