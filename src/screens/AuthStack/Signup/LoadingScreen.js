// LoadingScreen.js
import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

const LoadingScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#2BBC15" />
      <Text style={{ marginTop: 10 }}>Verifying email...</Text>
    </View>
  );
};

export default LoadingScreen;
