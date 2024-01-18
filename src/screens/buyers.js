import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const BuyersScreen = ({ route }) => {
  const { buyers } = route.params;
  const [buyerDetails, setBuyerDetails] = useState([]);
  const navigation = useNavigation();
  const { user_Info } = useSelector((state) => state.home);

  useEffect(() => {
    const fetchBuyerDetails = async () => {
      try {
        const apiKey = '90bd6f5b-033f-42e7-8e92-2a443dfa42f8';

        // Fetch details for each buyer using their user ID
        const buyerDetailsPromises = buyers.map(async (buyerId) => {
          const buyerDetailsApiUrl = `http://139.59.236.50:5550/viewmember_crm?mid=${buyerId}`;
          const buyerDetailsResponse = await fetch(buyerDetailsApiUrl, {
            headers: {
              'api-key': apiKey,
            },
          });

          const buyerDetailsResult = await buyerDetailsResponse.json();

          if (buyerDetailsResult.success) {
            return buyerDetailsResult.member;
          } else {
            console.error(`Failed to fetch details for buyer ${buyerId}`);
            return null;
          }
        });

        // Wait for all promises to resolve
        const buyerDetails = await Promise.all(buyerDetailsPromises);

        // Filter out any null values (failed fetches)
        const filteredBuyerDetails = buyerDetails.filter((details) => details !== null);

        setBuyerDetails(filteredBuyerDetails);
      } catch (error) {
        console.error('Error fetching buyer details:', error.message);
      }
    };

    fetchBuyerDetails();
  }, [buyers]);

  const handleBuyerPress = (buyer) => {
    // Navigate to ChatScreenListing with relevant parameters
    navigation.navigate('ChatScreenListing', {
      mid: user_Info?.mid,
      lid: 'c7117c59d5f54a33844a0cb5a4e77a1d',
      seller_id: buyer.mid,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.buyersTitle}>Buyers for the Listing:</Text>
      {buyerDetails.length === 0 ? (
        <Text style={styles.noBuyersText}>No buyers yet.</Text>
      ) : (
        buyerDetails.map((buyer, index) => (
          <TouchableOpacity key={index} style={styles.buyerCard} onPress={() => handleBuyerPress(buyer)}>
            <Image source={{ uri: buyer.pic_url }} style={styles.buyerImage} />
            <Text style={styles.buyerName}>{buyer.uname}</Text>
          </TouchableOpacity>
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  buyersTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: 'black',
  },
  noBuyersText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'start',
    marginTop:20
  },
  buyerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  buyerImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  buyerName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: 'black',
  },
});

export default BuyersScreen;
