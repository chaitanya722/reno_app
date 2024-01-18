import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '../constants/colors';
import SearchBar from './SearchBar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { vh } from '../util/dimenstions';
import Images from '../constants/Images';
import { useNavigation } from '@react-navigation/native';
import RoutePaths from '../Navigations/RoutePaths';
import { useSelector } from 'react-redux';

const ChatHeader = ({
  withBackBtn,
  title,
  route,
  isProfile,
  isEditProfile,
}) => {
  const safeAreaInsets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { isLoading, marketPlaceList, user_Info, homeServiceList, showCaseList } =
    useSelector(state => state.home);

  return (
    <View
      style={{
        ...styles.mainContainer,
        minHeight: isProfile ? 70 : 70,
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
              <Ionicons name="arrow-back-outline" size={30} color="#FFFFFF" />
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
                <Text style={styles.editProfileButtonText}>Edit  </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => navigation.navigate(RoutePaths.changePasswod)}>
                <Text style={{ color: Colors.White, marginTop: 6 ,fontSize:13}}>
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
    {/* Move the logo before the menu button */}
    <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
      <Ionicons name="menu-outline" size={30} color='black' />
    </TouchableOpacity>
    <Image source={Images.logo} style={styles.logo} />

  </View>
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <TouchableOpacity onPress={() => 0}>
      <Ionicons name="notifications" size={25} color='grey' />
    </TouchableOpacity>
    {/* Add a space or margin between the icons */}
    <View style={{ width: 20 }} />
    <TouchableOpacity onPress={() => navigation.navigate(RoutePaths.Cart)}>
      <Ionicons name="cart" size={25} color='grey' />
    </TouchableOpacity>
  </View>
</View>

          <View style={styles.searchContainer}>
            {/* <SearchBar /> */}
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
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
    mainContainer: {
        padding: 15,
        backgroundColor: '#488C22',
      },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },

  txt: {
    color: "#FFFFFF" ,
    fontSize: 18,
    fontWeight: '600',
  },
 
  editProfileButtonText: {
    marginTop:5,
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ChatHeader;
