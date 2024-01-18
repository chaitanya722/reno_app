import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import axios from 'axios';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const apiKey = '90bd6f5b-033f-42e7-8e92-2a443dfa42f8';
  const mid = 'ac64d2d7eb9d40819bc72a420d8cb412';

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `https://apis.devcorps.in/getOrderHistory_crm`,
          {
            params: { mid: mid },
            headers: {
              'api-key': apiKey,
            },
          }
        );
        setOrders(response.data.orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const renderItem = ({ item }) => (
    <View style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
      <Text>Order ID: {item.oid}</Text>
      <Text>Amount: {item.amount}</Text>
      <FlatList
        data={item.products}
        keyExtractor={(product) => product.pid}
        renderItem={({ item: product }) => (
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
            <Image source={{ uri: product.photo }} style={{ width: 50, height: 50, marginRight: 8 }} />
            <Text>{product.product_name}</Text>
          </View>
        )}
      />
    </View>
  );

  return (
    <View>
      <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', margin: 16 }}>
        Order History
      </Text>
      <FlatList
        data={orders}
        keyExtractor={(order) => order.oid}
        renderItem={renderItem}
      />
    </View>
  );
};

export default OrdersPage;
