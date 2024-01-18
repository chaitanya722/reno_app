import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import RoutePaths from '../RoutePaths';
// import BottomTab from '../Tabnavigation';
import Customdrawer from '../../components/Customdrawer';
import BottomTabNavigation from '../BottomTabBar';

const width = Dimensions.get('screen').width;

const Appdrawer = () => {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      drawerContent={props => <Customdrawer {...props} />}
      screenOptions={{
        swipeEnabled: false,
        headerShown: false,
        drawerStyle: {
          width: width / 1.2,
        },
      }}>
      <Drawer.Screen
        name={RoutePaths.bottomtab}
        component={BottomTabNavigation}
      />
      
    </Drawer.Navigator>
  );
};

export default Appdrawer;

const styles = StyleSheet.create({});
