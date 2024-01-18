import React, {useContext} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Colors from '../constants/colors';
import SearchBar from './SearchBar';
import HeaderCartbtn from './HeaderCartbtn';
import {vh} from '../util/dimenstions';
import Images from '../constants/Images';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const AppHeader = ({withBackBtn, title}) => {
  const safeAreaInsets = useSafeAreaInsets();
  const navigation = useNavigation();
  // const onPressHandler = (sender = 'back' | 'cart' | 'login' | 'language') => {
  //   if (sender === 'cart') {
  //     console.log('navigate to cart');
  //     // navigation.navigate(RoutePaths.cart);
  //   }
  //   if (sender === 'login') {
  //     navigation.navigate(RoutePaths.login);
  //   }
  //   if (sender === 'language') {
  //     console.log('change language');
  //   }
  //   if (sender === 'back' && navigation?.canGoBack?.()) {
  //     navigation.goBack();
  //   }
  // };

  return (
    <View
      style={{
        ...styles.mainContainer,
      }}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Ionicons name="arrow-back-outline" size={30} color="#fff" />
          <View style={{marginLeft: 10}}>
            <Text style={styles.txt}>{title}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.lightgreen,
    padding: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },
  profileImage: {
    height: 42,
    width: 42,
  },
  txt: {
    color: Colors.White,
  },
});

export default AppHeader;
