import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import RoutePaths from '../RoutePaths';
import Login from '../../screens/AuthStack/Login';
import Signup from '../../screens/AuthStack/Signup';
import Forgotpassword from '../../screens/AuthStack/Forgotpassword';
import Loader from '../../components/Loader';
import { useSelector } from 'react-redux';

const Stack = createStackNavigator();

const Authstack = () => {
 
  const {isloading} = useSelector(state => state?.home);



  return (
    <View style={{flex: 1, backgroundColor: '#FFF'}}>
      {isloading ? (
        <Loader />
      ) : (
        <Stack.Navigator
          initialRouteName={RoutePaths.login}
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name={RoutePaths.login} component={Login} />
          <Stack.Screen name={RoutePaths.signUp} component={Signup} />
          <Stack.Screen
            name={RoutePaths.forgotpassword}
            component={Forgotpassword}
          />
        </Stack.Navigator>
      )}
    </View>
  );
};

export default Authstack;

const styles = StyleSheet.create({});
