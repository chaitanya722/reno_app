// TransactionHistoryScreen.js

import React, { useEffect, useState } from 'react';
import Colors from '../constants/colors';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

const TransactionHistoryScreen = () => {
  const [transactionHistory, setTransactionHistory] = useState([]);
  const { user_Info } = useSelector((state) => state.home);

  const [selectedType, setSelectedType] = useState('Sold');
  const apiKey = '90bd6f5b-033f-42e7-8e92-2a443dfa42f8';
  const mid = user_Info?.mid

  useEffect(() => {
    const fetchTransactionHistory = async () => {
      try {
        let apiUrl = '';

        if (selectedType === 'Sold') {
          apiUrl = `https://apis.devcorps.in/getMarketplaceSale?mid=${mid}`;
        } else if (selectedType === 'Purchase') {
          apiUrl = `https://apis.devcorps.in/getMarketplacePurchase?mid=${mid}`;
        }

        const response = await fetch(apiUrl, {
          headers: {
            'api-key': apiKey,
          },
        });

        const result = await response.json();

        if (result && result.length > 0) {
          setTransactionHistory(result);
        } else {
          console.error('No transaction history found.');
          setTransactionHistory([]); // Set an empty array when there's no data
        }
      } catch (error) {
        console.error('Error fetching transaction history:', error.message);
      }
    };

    fetchTransactionHistory();
  }, [selectedType, mid]);
  

  
  

  const handleTypeChange = (type) => {
    setSelectedType(type);
  };

  const SellerName = ({ mid, isPurchase }) => {
    const [sellerName, setSellerName] = useState('');
  
    useEffect(() => {
      const getMemberInfo = async () => {
        try {
          const apiKey = '90bd6f5b-033f-42e7-8e92-2a443dfa42f8';
  
          const response = await fetch(`https://apis.devcorps.in/viewmember_crm?mid=${mid}`, {
            headers: {
              'api-key': apiKey,
            },
          });
  
          const result = await response.json();
  
          if (result.success) {
            // Use the actual field name for the username
            setSellerName(result.member.uname);
          } else {
            console.error('Failed to fetch member details:', result.message);
          }
        } catch (error) {
          console.error('Error fetching member details:', error.message);
        }
      };
  
      getMemberInfo();
    }, [mid]);
  
    const transactionText = isPurchase ? 'Purchased by:' : 'Sold to:';
    return <Text style={styles.sellertext}>{transactionText} {sellerName}</Text>;
  };
  
  const renderTransactionItem = (transactionsForDate) => (
    <View key={transactionsForDate[0].date} style={styles.transactionsForDate}>
      <View style={styles.datecontainer}>
        <Text style={styles.date}>{transactionsForDate[0].date}</Text>
      </View>
      {transactionsForDate.map((transaction) => (
        <View key={transaction.lid} style={styles.transactionContainer}>
          <Image source={{ uri: transaction.p_image }} style={styles.productImage} />
          <View style={styles.transactionDetails}>
            <Text style={styles.productTitle}>{transaction.p_title}</Text>
            <View style={styles.transactionDetails}>
            <View style={styles.transactionDetails2}>
            <Text style={styles.price}>Price: {transaction.sold_price}</Text>

            <View style={styles.gap}></View>
            <Text style={styles.quantityText}>Quantity: {transaction.count}</Text>


            </View>
            </View>

            <SellerName mid={transaction.seller_mid} isPurchase={selectedType === 'Purchase'} />
          </View>
        </View>
      ))}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={[styles.headerButton, selectedType === 'Sold' && styles.selectedButton]}
          onPress={() => handleTypeChange('Sold')}
        >
          <Text style={styles.headerButtonText}>Sold</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.headerButton, selectedType === 'Purchase' && styles.selectedButton]}
          onPress={() => handleTypeChange('Purchase')}
        >
          <Text style={styles.headerButtonText}>Purchase</Text>
        </TouchableOpacity>
      </View>
      {transactionHistory.reduce((accumulator, transaction) => {
        // Group transactions by date
        const existingDateGroup = accumulator.find((group) => group[0].date === transaction.date);

        if (existingDateGroup) {
          existingDateGroup.push(transaction);
        } else {
          accumulator.push([transaction]);
        }

        return accumulator;
      }, []).map((transactionsForDate) => renderTransactionItem(transactionsForDate))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  headerButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  selectedButton: {
    borderBottomWidth: 2,
    borderBottomColor: '#488C20',
  },
  headerButtonText: {
    color: Colors.Gray,
    fontWeight: '600',
    marginRight: 10,
    marginRight: 10,
  },
  transactionContainer: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding:10
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  transactionDetails: {
    flex: 1,
  },
  gap: {
    width: 65,
  },
  transactionDetails2: {
    flexDirection:'row',
    alignContent:'space-between'
  },
  productTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: Colors.Gray,
  },
  sellertext: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
    color: Colors.Gray,
  },
  price: {
    fontSize: 14,
    fontWeight: '500',
    color: '#488C22',
    marginBottom: 4,
  },
  date: {
    fontSize: 13,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  datecontainer: {
    backgroundColor: '#488C20',
    marginBottom: 8,
    padding: 3,
    borderRadius: 4,
  },
  row:{
    flexDirection: 'row',
    alignContent:'space-between'

  }
});

export default TransactionHistoryScreen;
