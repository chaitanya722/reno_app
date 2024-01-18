import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const BottomAppBar = () => {
  return (
    <View style={styles.bottomAppBar}>
      <TouchableOpacity style={styles.iconContainer} onPress={() => console.log('Home pressed')}>
        <Icon name="home" size={30} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer} onPress={() => console.log('Search pressed')}>
        <Icon name="search" size={30} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer} onPress={() => console.log('Add pressed')}>
        <Icon name="add-circle" size={30} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer} onPress={() => console.log('Notifications pressed')}>
        <Icon name="notifications" size={30} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer} onPress={() => console.log('Profile pressed')}>
        <Icon name="person" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomAppBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#6200EE', // Change the background color as needed
    height: 60, // Adjust the height as needed
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default BottomAppBar;
