import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Badge } from '@ant-design/react-native';
import Images from '../constants/Images';
import { useNavigation } from '@react-navigation/native';
import RoutePaths from '../Navigations/RoutePaths';
import Colors from '../constants/colors';
import axios from 'axios'; // Import axios for making API requests

const CommonHeader = ({
  withBackBtn,
  title,
  isProfile,
  isEditProfile,
  
}) => {
  const navigation = useNavigation();
  const [unreadMessageCount, setUnreadMessageCount] = useState(0);
  const [cartItemCount, setCartItemCount] = useState(0);


  const fetchUnreadMessageCount = async () => {
    try {
      const response = await axios.get('https://apis.devcorps.in/getNotes_crm', {
        headers: {
          'api-key': '90bd6f5b-033f-42e7-8e92-2a443dfa42f8',
        },
        params: {
          mid: 'as7ash7qw23dds99783',
        },
      });

      if (response.data.success) {
        const messages = response.data.data.messages;
        const unreadCount = messages.filter(message => !message.readed).length;
        setUnreadMessageCount(unreadCount);
      }
    } catch (error) {
      console.error('Error fetching unread message count:', error);
    }
  };
  const fetchCartItemCount = async () => {
    try {
      const response = await axios.get('https://apis2.devcorps.in/api/cart_hsm', {
        headers: {
          'api-key': '90bd6f5b-033f-42e7-8e92-2a443dfa42f8',
        },
        params: {
          mid: 'ac64d2d7eb9d40819bc72a420d8cb412',
        },
      });

      if (response.data.success) {
        const itemCount = response.data.products.length;
        setCartItemCount(itemCount);
      }
    } catch (error) {
      console.error('Error fetching cart item count:', error);
    }
  };

  useEffect(() => {
    fetchUnreadMessageCount();
    fetchCartItemCount();
  }, []);

 
  return (
    <View
      style={{
        ...styles.mainContainer,
        minHeight: isProfile ? 110 : 70,
      }}>
      {withBackBtn ? (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={() => navigation.goBack()}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="arrow-back-outline" size={30} color="#8C8C8C" />
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.txt}>{title}</Text>
              </View>
            </View>
          </TouchableOpacity>
          {isProfile ? (
            isEditProfile ? (
              <TouchableOpacity
                style={styles.editProfileButton}
                onPress={() => navigation.navigate(RoutePaths.editProfile)}>
                <Text style={styles.editProfileButtonText}>Edit</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => navigation.navigate(RoutePaths.changePasswod)}>
                <Text style={{ color: Colors.appOrange, marginTop: 8, fontSize: 16 }}>
                  Change Password
                </Text>
              </TouchableOpacity>
            )
          ) : null}
        </View>
      ) : (
        <>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                <Ionicons name="menu-outline" size={30} color='black' />
              </TouchableOpacity>
              <Image source={Images.logo} style={styles.logo} />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Badge
          text={unreadMessageCount ? unreadMessageCount.toString() : '0'}
          overflowCount={99}
          style={{ color: 'white' }}
        >
          <TouchableOpacity onPress={() => navigation.navigate(RoutePaths.NotificationScreen)}>
            <Ionicons name="notifications" size={25} color='grey' />
          </TouchableOpacity>
        </Badge>
              <View style={{ width: 20 }} />
              <Badge
        text={cartItemCount ? cartItemCount.toString() : '0'}
        overflowCount={99}
        style={{ color: 'white' }}
      >
        <TouchableOpacity onPress={() => navigation.navigate(RoutePaths.Cart)}>
          <Ionicons name="cart" size={25} color='grey' />
        </TouchableOpacity>
      </Badge>
            </View>
          </View>
        </>
      )}
      {isProfile ? (
        <View
          style={{
            padding: 5,
            position: 'absolute',
            top: 45,
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <Image source={Images.logo} style={{ ...styles.logo, marginLeft: -30 }} />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    padding: 18,
  },
  logo: {
    height: 42,
    width: 100,
    resizeMode: 'cover',
  },
  txt: {
    color: "#8C8C8C",
    fontSize: 18,
    fontWeight: '600',
  },
  editProfileButtonText: {
    color: Colors.appOrange,
    fontSize: 14,
    fontWeight: '600',
  },
});

export default CommonHeader;
