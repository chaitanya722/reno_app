import React, {useContext} from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '../constants/colors';
import {vh, vw} from '../util/dimenstions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Images from '../constants/Images';
const TopCard = ({ data, onPress, onCategoryClick }) => {
  const handlePress = () => {
    if (onPress) {
      onPress();
    }
   
    if (onCategoryClick) {
      onCategoryClick(data);
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{
        ...styles.mainContainer,
      }}>
      <View
        style={{
          borderRadius: 30,
          backgroundColor: Colors.Gray,
          shadowColor: '#000',
          width: 54,
          height: 54,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image source={Images.servicesImg} style={{ height: 30, width: 30 }} />
      </View>
      <Text style={{ marginTop: 10, color: Colors.Black }}>{data}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    margin: vw(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: vw(200),
    height: 140,
    // flex:1,
    alignSelf: 'center',
    borderRadius: 20,
    resizeMode: 'cover',
  },
});

export default TopCard;
