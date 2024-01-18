import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Colors from '../constants/colors';

const TabBarButton = props => {
  const {onPress, title, focused, iconName} = props;

  const dynamicStyle = {
    color: focused ? Colors.lightgreen : Colors.lightprimary,
    tintColor: focused ? Colors.lightgreen : Colors.lightprimary,
  };
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image
        style={[dynamicStyle, {height: 20, width: 20}]}
        source={iconName}
      />
      <Text style={[styles.text, dynamicStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 2,
  },
  text: {
    fontSize: 9,
    marginTop:3
  },
});

export default TabBarButton;
