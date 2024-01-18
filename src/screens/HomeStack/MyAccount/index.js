import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  Alert,
  TouchableOpacity,
  SafeAreaView,
  Modal,
} from 'react-native';

import RoutePaths from '../../../Navigations/RoutePaths';
import {useDispatch, useSelector} from 'react-redux';
import Images from '../../../constants/Images';
import Colors from '../../../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import accountImg from '../../../constants/accoutImg';
import {_doLogout} from '../../../store/auth/auth.actions';

const MyAccount = ({navigation}) => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [SelectIndex, setSelectIndex] = useState(false);
  const {isLoading, marketPlaceList, user_Info, homeServiceList, showCaseList} =
    useSelector(state => state.home);

  const menuItems = [
    {
      id: 1,
      title: 'My Profile',
      img: accountImg.myProfile,
      navigation: RoutePaths.Profile,
    },
    {
      id: 2,
      title: 'My Points/wallet',
      img: accountImg.wallet,
      navigation: RoutePaths.wallet,
    },
   
    {
      id: 4,
      title: 'My Market Place Purchase',
      img: accountImg.purchase,

      navigation: RoutePaths.Services,
    },
    {
      id: 5,
      title: 'My Market Place sell',
      img: accountImg.listing,

      navigation: RoutePaths.home,
    },
    // {
    //   id: 6,
    //   title: 'Leave Review',
    //   img: accountImg.leaveReview,
    //   navigation: RoutePaths.leaveReview,
    // },

    {
      id: 8,
      title: 'Sells',
      img: accountImg.sell,
      navigation: RoutePaths.wallet,
    },
    {
      id: 9,
      title: 'My Likes',
      img: accountImg.myLikes,
      navigation: RoutePaths.MyLikes,
    },
    {
      id: 10,
      title: 'Chats',
      img: accountImg.inboxImg,
      navigation: RoutePaths.ChattingScreen,
    },
  ];

  const handlelogout = () => {
    dispatch(_doLogout(null));
  };

  const footer = () => {
    return (
      <TouchableOpacity
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          paddingHorizontal: 20,
        }}
        onPress={handlelogout}>
        <Ionicons name="power-outline" size={23} color={Colors.appred} />
        <Text style={{margin: 10, fontSize: 16, color: Colors.appred}}>
          Logout
        </Text>
      </TouchableOpacity>
    );
  };

  const _renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{
          padding: 14,
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: Colors.White,
        }}
        onPress={() => {
          navigation.navigate(item.navigation), setSelectIndex(index);
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            style={[
              {
                height: 25,
                width: 25,
              },
            ]}
            source={item.img}
          />
          <Text
            style={{
              color: Colors.lightprimary,
              fontSize: 16,
              fontWeight: '400',
              marginLeft: 15,
            }}>
            {item.title}
          </Text>
        </View>
        <Ionicons
          name="chevron-forward-outline"
          size={23}
          color={Colors.Black}
        />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.White}}>
      <View
        style={{
          height: 75,
          backgroundColor: Colors.lightgreen,
          paddingLeft: 14,
          marginBottom: 50,
        }}>
        {user_Info?.pic_url ? (
          <Image
            style={[
              {
                height: 120,
                width: 120,
                borderRadius:60,
                resizeMode:'cover'
              },
            ]}
            source={{uri:user_Info?.pic_url}}
          />
        ) : (
          <Image
            style={[
              {
                height: 120,
                width: 120,
              },
            ]}
            source={Images.personProfile}
          />
        )}
      </View>
      <FlatList
        style={{marginTop: 10}}
        data={menuItems}
        renderItem={_renderItem}
        keyExtractor={item => item.id}
        ListFooterComponent={footer}
        ListFooterComponentStyle={{flex: 1, justifyContent: 'flex-end'}}
      />
    </SafeAreaView>
  );
};
export default MyAccount;
