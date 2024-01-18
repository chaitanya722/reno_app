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
import React, {useRef,useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../../constants/colors';
import WalletTransactionList from '../../../components/WalletTransactionList';
import { useSelector} from 'react-redux';

import {normalize} from '../../../util/dimenstions';
import {vh} from '../../../helper/dimension';
import Images from '../../../constants/Images';

const Wallet = ({navigation}) => {
  const { user_Info } = useSelector((state) => state.home);
  const handleWebViewLoad = () => {
    setIsLoading(false);
  };

  return (
    <View style={{flex: 1}}>
      <View style={{flexDirection: 'row', height: 150}}>
        <View
          style={{
            backgroundColor: Colors.Black,
            height: '50%',
            flex: 1,
            margin: 10,
            borderRadius: 5,
          }}>
          <View
            style={{flexDirection: 'row', margin: 15, alignItems: 'center'}}>
            <View
              style={{
                width: 44,
                height: 44,
                backgroundColor: Colors.lightgreen,
                borderRadius: 22,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image source={Images.Coin_Wallet} style={{height:20,width:20}} />
            </View>
            <View style={{marginLeft: 5}}>
              <Text
                style={{
                  fontSize: normalize(16),
                  fontWeight: '700',
                  color: Colors.White,
                  lineHeight: normalize(24),
                }}>
             ${Math.floor(user_Info?.cashback_points)}
              </Text>
              <Text
                style={{
                  fontSize: normalize(12),
                  fontWeight: '400',
                  color: Colors.White,
                  lineHeight: normalize(24),
                  color:Colors.White
                }}>
             Cashback Points
              </Text>
            </View>
          </View>

          {/* <TouchableOpacity
            style={{
              backgroundColor: '#F6FFEB',

              marginHorizontal: 15,
              borderRadius: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: normalize(12),
                fontWeight: '600',
                marginVertical: vh(10),
                color:Colors.Black,          
                    }}>
              WITHDRAW
            </Text>
          </TouchableOpacity> */}
        </View>
      
        <View
          style={{
            backgroundColor: Colors.appOrange,
            height: '50%',
            flex: 1,
            margin: 10,
            borderRadius: 5,
          }}>
          <View
            style={{flexDirection: 'row', margin: 15, alignItems: 'center'}}>
            <View
              style={{
                width: 44,
                height: 44,
                backgroundColor: Colors.lightgreen,
                borderRadius: 22,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image source={Images.Coin_Wallet} style={{height:20,width:20}} />
            </View>
            <View style={{marginLeft: 5}}>
              <Text
                style={{
                  fontSize: normalize(16),
                  fontWeight: '700',
                  color: Colors.Black,
                  lineHeight: normalize(24),
                }}>
 ${Math.floor(user_Info?.reward_points)}  
              </Text>
              <Text
                style={{
                  fontSize: normalize(12),
                  fontWeight: '400',
                  color: Colors.Black,
                  lineHeight: normalize(24),
                }}>
             Reward Points
              </Text>
            </View>
          </View>

          {/* <TouchableOpacity
            style={{
              backgroundColor: Colors.Black,

              marginHorizontal: 15,
              borderRadius: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: normalize(12),
                fontWeight: '600',
                marginVertical: vh(10),
                color:Colors.White,  
                        
                    }}>
              GET POINT
            </Text>
          </TouchableOpacity> */}
        </View>

        {/* <View
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
        </View> */}
      </View>

      <WalletTransactionList />
    </View>
  );
};

export default Wallet;
