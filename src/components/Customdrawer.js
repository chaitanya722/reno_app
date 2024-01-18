import React, { useEffect, useRef, useState } from 'react';
import {  FlatList, SafeAreaView, Modal } from 'react-native';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import RoutePaths from '../Navigations/RoutePaths';
import { _doLogout } from '../store/auth/auth.actions';
import { useDispatch, useSelector } from 'react-redux';
import Images from '../constants/Images';
import Colors from '../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Linking } from 'react-native';
import Temp from '../screens/HomeStack/Showcase/index';


const DrawerHeader = ({ navigation }) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.crossButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="close" size={30} color="grey" />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={Images.logo} style={styles.logo} />
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={() => navigation.navigate(RoutePaths.wallet,)}>
            
              <Ionicons name="wallet" size={25} color="grey" />
            </TouchableOpacity>
            {/* Add a space or margin between the icons */}
            <View style={{ width: 20 }} />
            <Text style={styles.btntxt}>13</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const Customdrawer = ({ navigation }) => {
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectIndex, setSelectIndex] = useState(false);

  const menuItems = [
    {
      id: 1,
      title: 'Profile',
      iconName: 'person',
      navigation: RoutePaths.Profile,
    },
    {
      id: 2,
      title: 'My Orders',
      iconName: 'list',
      navigation: RoutePaths.OrdersScreen,
    },
    {
      id: 3,
      title: 'My Booking',
      iconName: 'event',
      navigation: RoutePaths.Booking,
    },
    {
      id: 4,
      title: 'My Listings',
      iconName: 'business-center',
      navigation: RoutePaths.MyListingScreen,
    },
    {
      id: 5,
      title: 'Transaction-History',
      iconName: 'history',
      navigation: RoutePaths.MarketplacePS,    },
    {
      id: 6,
      title: 'Help Desk',
      iconName: 'support-agent',
      navigation: RoutePaths.Support,
    },
    {
      id: 7,
      title: 'About US',
      iconName: 'info',
    },
   
    {
      id: 9,
      title: 'Logout',
      iconName: 'logout',
      navigation: RoutePaths.showCase,
    },
  ];

  const handleLogout = () => {
    dispatch(_doLogout(null));
  };

  const _renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={{
          padding: 10,
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: index == selectIndex ? Colors.lightgreen : Colors.White,
        }}
        onPress={() => {
          if (item.title === 'Logout') {
            handleLogout();
          } else if (item.title === 'About US') {
            Linking.openURL('http://139.59.236.50:3002/aboutus');
          } else if (item.title === 'Contact Us') {
            Linking.openURL('http://139.59.236.50:3002/contact');
          } else if (item.component) {
            navigation.navigate(item.component);
            setSelectIndex(index);
          } else {
            navigation.navigate(item.navigation);
            setSelectIndex(index);
          }
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon
            name={item.iconName}
            size={25}
            color={index == selectIndex ? Colors.White : '#878787'}
          />
          <Text
            style={{
              color: index == selectIndex ? Colors.White : '#878787',
              fontSize: 16,
              fontWeight: '400',
              marginLeft: 15,
            }}
          >
            {item.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DrawerHeader navigation={navigation} />

      <FlatList
        style={{ marginTop: 10 }}
        data={menuItems}
        renderItem={_renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ flexGrow: 1 }}
      />

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 22,
        }}
      >
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={{ flex: 1 }}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'rgba(0,0,0,0.5)',
                justifyContent: 'flex-end',
              }}
            >
              <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => setModalVisible(!modalVisible)}
              />
            </View>
            <View
              style={{
                backgroundColor: 'white',
                borderRadius: 20,
                padding: 35,
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
              }}
            >
              <Text>Hello World!</Text>
              <TouchableOpacity
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text>Hide Modal</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = {
  mainContainer: {
    padding: 15,
  },
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  crossButton: {
    marginRight: 10,
  },
  logo: {
    height: 42,
    width: 100,
    resizeMode: 'cover',
    marginRight: 70,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btntxt: {
    fontSize: 15,
    color: '#2BBC15',
    fontWeight: '400',
  },
};

export default Customdrawer;