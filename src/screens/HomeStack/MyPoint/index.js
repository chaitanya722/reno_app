import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import React, {useState} from 'react';


const MyPoint = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleWebViewLoad = () => {
    setIsLoading(false);
  };

  return (
    <View style={{flex: 1}}>
      <Text>Services</Text>
    </View>
  );
};

export default MyPoint;
