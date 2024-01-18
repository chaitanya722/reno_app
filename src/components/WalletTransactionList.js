import React, { useState, useEffect } from 'react';
import { FlatList, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios'; 
import Colors from '../constants/colors';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../services/environment';

const WalletTransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const { user_Info } = useSelector((state) => state.home);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mid = user_Info?.mid;
        const apiKey = '90bd6f5b-033f-42e7-8e92-2a443dfa42f8';

        const response = await axios.get(
          `${BASE_URL}get_transaction_history_wallet?mid=${mid}`,
          { headers: { 'api-key': apiKey } }
        );

        if (response.data.success) {
          setTransactions(response.data.data);
        } else {
          console.error('API request failed:', response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Text
        style={{
          fontSize: 16,
          fontWeight: '500',
          marginLeft: 15,
          marginTop: 10,
          color: '#2B2B2B',
        }}>
        Transaction history
      </Text>
      <FlatList
        data={transactions}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                margin: 15,
                borderBottomWidth: 0.3,
                borderBottomColor: Colors.Gray,
                paddingBottom: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      justifyContent: 'center',
                      backgroundColor:
                        item.event === 'Credited'
                          ? Colors.lightgreen
                          : Colors.appOrange,
                      borderRadius: 5,
                      alignItems: 'center',
                    }}>
                    <Ionicons
                      name={
                        item.event === 'Credited'
                          ? 'arrow-up-outline'
                          : 'arrow-down-outline'
                      }
                      size={32}
                      color={Colors.White}
                      style={{ transform: [{ rotate: '45deg' }] }}
                    />
                  </View>
                  <View style={{ marginHorizontal: 10 }}>
                    <Text
                      style={{ fontSize: 16, fontWeight: '500', color: '#2B2B2B' }}>
                      {item?.event}
                    </Text>
                    <Text
                      style={{ fontSize: 13, fontWeight: '400', color: '#2B2B2B' }}>
                      From Purchase
                    </Text>
                  </View>
                </View>
                <View style={{ marginHorizontal: 10, alignItems: 'flex-end' }}>
                  <Text style={{ fontSize: 16, fontWeight: '500', color: '#2B2B2B' }}>
                    ${Math.floor(item?.amt)}
                  </Text>
                  <Text
                    style={{ fontSize: 13, fontWeight: '400', color: '#2B2B2B' }}>
                    {item?.category}
                  </Text>
                </View>
              </View>
              <Text style={{ marginTop: 5, fontSize: 11, fontWeight: '300', color: '#2B2B2B' }}>
                {item?.date}
              </Text>
            </View>
          );
        }}
        keyExtractor={(item) => item.transaction_id}
      />
    </View>
  );
};

export default WalletTransactionList;
