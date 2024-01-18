import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import React, {useState} from 'react';


const Checkout = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleWebViewLoad = () => {
    setIsLoading(false);
  };

  return (
    <View style={{flex: 1}}>
      
    </View>
  );
};

export default Checkout;
