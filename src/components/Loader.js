import {View, ActivityIndicator} from 'react-native';
import React from 'react';

const Loader = ({navigation}) => {
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
      }}>
      <ActivityIndicator size={'large'} color={'green'} />
    </View>
  );
};

export default Loader;
