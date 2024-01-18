import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Images from '../constants/Images';
import Colors from '../constants/colors';

const HeaderCartbtn = () => {
  const navigation = useNavigation();

  const handleCartPress = () => {
    navigation.navigate('Cart');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleCartPress}>
        <Image source={Images.cartImg} style={styles.img} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.White,
    borderRadius: 5,
  },
  img: {
    height: 40,
    width: 40,
  },
});

export default HeaderCartbtn;
