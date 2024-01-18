import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Authstack from './Authstack';
import Homestack from './Homestack';
import {useSelector} from 'react-redux';
import Loader from '../components/Loader';

const Router = () => {
  const {User_mid, isLoading} = useSelector(state => state.auth);
  const {isLoad, marketPlaceList} = useSelector(state => state.home);


  return (
    <SafeAreaView style={{flex: 1}}>
      {isLoading || isLoad ? <Loader /> : null}
      <NavigationContainer>
        {User_mid ? <Homestack /> : <Authstack />}
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default Router;

const styles = StyleSheet.create({});
