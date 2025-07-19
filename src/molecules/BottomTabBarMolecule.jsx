import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import TextAtom from '../atoms/TextAtom';
import { HomeIcon, UserCircleIcon } from 'react-native-heroicons/outline';
import { useTranslation } from 'react-i18next';
const tabs = [
  {
    key: 'NewsFeed',
    label: 'news_label',
    icon: <HomeIcon />,
  },
  {
    key: 'Profile',
    label: 'account',
    icon: <UserCircleIcon />,
  },
];

const BottomTabBarMolecule = ({ state, descriptors, navigation }) => {
  const { t } = useTranslation();
  return (
    <View style={styles.tabBarcontainer}>
      <View style={styles.tabBar}>
        {tabs.map((tab, index) => {
          const isFocused = state.index === index;
          return (
            <TouchableOpacity
              key={tab.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              onPress={() => {
                if (state.routes[index]) {
                  navigation.navigate(state.routes[index].name);
                }
              }}
              style={[styles.tab, isFocused && { backgroundColor: '#f9b233' }]}
            >
              <View style={styles.iconContainer}>
                {React.cloneElement(tab.icon, {
                  color: '#000',
                })}
              </View>
              <TextAtom style={[styles.label]}>{t(tab.label)}</TextAtom>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarcontainer: {
    paddingBottom: wp(5),
    backgroundColor: '#000',
  },
  tabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingTop: hp(1),
    paddingBottom: hp(0.5),
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 8,
  },
  iconContainer: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -hp(0.5),
    right: -wp(2),
    backgroundColor: '#FF3B30',
    borderRadius: wp(3),
    minWidth: wp(4),
    height: wp(4),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  badgeText: {
    color: '#fff',
    fontSize: wp(2.5),
    fontWeight: 'bold',
  },
  label: {
    fontSize: wp(3),
    color: '#000',
    marginTop: hp(0.5),
  },
  focusedLabel: {
    color: '#FFD600',
    fontWeight: 'bold',
  },
});

export default BottomTabBarMolecule;
