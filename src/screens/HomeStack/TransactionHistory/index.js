import {
    StyleSheet,
    FlatList,
    Text,
    View,
    ImageBackground,
    Touchable,
    Image,
    TouchableOpacity,
  } from 'react-native';
  import React, {useState} from 'react';
  import Ionicons from 'react-native-vector-icons/Ionicons';
  import Colors from '../../../constants/colors';
  import WalletTransactionList from '../../../components/WalletTransactionList';
  import {useDispatch, useSelector} from 'react-redux';
  
  import {normalize} from '../../../util/dimenstions';
  import {vh} from '../../../helper/dimension';
  import Images from '../../../constants/Images';
  import OrderHistoryTable from './orderhistorytable';
  
  const TransactionHistory = ({navigation}) => {
    const { user_Info } = useSelector(state => state.home);
    const handleWebViewLoad = () => {
      setIsLoading(false);
    };
  
    return (
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row', height: 150}}>
       
  
          <View
            style={{
              backgroundColor: Colors.appOrange,
              height: '80%',
              flex: 1,
              margin: 10,
              borderRadius: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                padding: 10,
                backgroundColor: Colors.White,
                borderRadius: 20,
                marginTop: 20,
              }}>
              <Image source={Images.Coin_Wallet} style={{height:20,width:20}} />
            </View>
  
            <Text
              style={{
                fontSize: normalize(16),
                fontWeight: '700',
                marginTop: vh(15),
                color: Colors.White,
                lineHeight: normalize(24),
              }}>
              $200.0
            </Text>
            <Text
              style={{
                fontSize: normalize(12),
                fontWeight: '400',
                color: Colors.White,
                lineHeight: normalize(24),
              }}>
              Pending Balance
            </Text>
          </View>
          
        </View>
        <OrderHistoryTable/>
      </View>
    );
  };
  
  export default TransactionHistory;
  