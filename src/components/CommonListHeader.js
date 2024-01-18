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

const CommonListHeader = ({title, onPress}) => {
  return (
    <View
      style={{
        ...styles.mainContainer,
      }}>
    
      
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  txt: {
    fontSize: 16,
    fontWeight: '400',
    color: Colors.Black,

  },
  btntxt: {
    fontSize: 15,
    color: Colors.Black,
    fontWeight: '400',
   
    // textDecorationLine: 'underline',
  },
});

export default CommonListHeader;
