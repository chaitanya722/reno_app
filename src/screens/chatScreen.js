// Import the necessary modules and components
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const ChattingScreen = () => {
  // State variables
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [selectedType, setSelectedType] = useState('Buyers');
  const { user_Info } = useSelector((state) => state.home);

  const apiKey = '90bd6f5b-033f-42e7-8e92-2a443dfa42f8';
  const mid = user_Info?.mid;
  const navigation = useNavigation();

  // Function to fetch transaction history
  useEffect(() => {
    const fetchTransactionHistory = async () => {
      try {
        let apiUrl = '';

        // Determine the API URL based on the selected type
        if (selectedType === 'Buyers') {
          apiUrl = `https://apis.devcorps.in/get_user_listing_profiles?mid=${mid}`;
        } else if (selectedType === 'Sellers') {
          const sellerApiUrl = `https://apis.devcorps.in/get_seller_listing_profile?mid=${mid}`;
          const sellerResponse = await fetch(sellerApiUrl, {
            headers: {
              'api-key': apiKey,
            },
          });

          const sellerResult = await sellerResponse.json();

          if (sellerResult && sellerResult.listings && sellerResult.listings.length > 0) {
            const sellerListings = sellerResult.listings;
            const listingsDetails = await Promise.all(
              sellerListings.map(async (lid) => {
                const listingApiUrl = `https://apis.devcorps.in/get_listing_profile?lid=${lid}`;
                const listingResponse = await fetch(listingApiUrl, {
                  headers: {
                    'api-key': apiKey,
                  },
                });

                const listingResult = await listingResponse.json();
                return listingResult.data;
              })
            );

            setTransactionHistory(listingsDetails);
          } else {
            console.error('No listings found for the seller.');
            setTransactionHistory([]); // Set an empty array when there's no data
          }
        }

        // Fetch transaction history based on the API URL
        const response = await fetch(apiUrl, {
          headers: {
            'api-key': apiKey,
          },
        });

        const result = await response.json();

        // Update the state with the fetched data
        if (result && result.listing_profiles && result.listing_profiles.length > 0) {
          setTransactionHistory(result.listing_profiles);
        } else {
          console.error('No listings found.');
          setTransactionHistory([]); // Set an empty array when there's no data
        }
      } catch (error) {
        console.error('Error fetching transaction history:', error.message);
      }
    };

    fetchTransactionHistory();
  }, [selectedType, mid]);

  // Function to handle type change
  const handleTypeChange = (type) => {
    setSelectedType(type);
  };

  const handleBuyersClick = async (lid, sellerId) => {
    try {
      // Fetch buyers for the selected listing
      const buyersApiUrl = `https://apis.devcorps.in/get_buyers_listing_profile?lid=${lid}`;
      const buyersResponse = await fetch(buyersApiUrl, {
        headers: {
          'api-key': apiKey,
        },
      });

      const buyersResult = await buyersResponse.json();

      // Navigate to the appropriate screen based on the selected type
      if (buyersResult.success) {
        if (selectedType === 'Sellers') {
          // If the item is from the "Sellers" section, navigate to the Chat Screen
          navigation.navigate('ChatScreenListing', { mid, lid, seller_id: sellerId });
        } else {
          // If the item is from the "Buyers" section, show the buyers' data
          navigation.navigate('Buyers', { buyers: buyersResult.buyers });
        }
      } else {
        console.error('No buyers found for the listing.');
        // Handle the case where no buyers are found
      }
    } catch (error) {
      console.error('Error fetching buyers:', error.message);
    }
  };

  // Function to render a transaction item
  const renderTransactionItem = (listing) => {
    // Check if listing is defined
    if (!listing) {
      return null; // or handle it in a way that makes sense for your app
    }

    return (
      <TouchableOpacity
        key={listing.lid}
        style={styles.transactionContainer}
        onPress={() => handleBuyersClick(listing.lid, listing.seller_id)}
      >
        {/* Check if thumbnail_photo is defined before accessing it */}
        {listing.thumbnail_photo && (
          <Image source={{ uri: listing.thumbnail_photo }} style={styles.productImage} />
        )}
        <View style={styles.transactionDetails}>
          <Text style={styles.productTitle}>{listing.title}</Text>
          <Text style={styles.price}>Price: ${listing.price}</Text>
          <Text style={styles.description}>{listing.seller_name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={[styles.headerButton, selectedType === 'Buyers' && styles.selectedButton]}
          onPress={() => handleTypeChange('Buyers')}
        >
          <Text style={styles.headerButtonText}>Buyers</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.headerButton, selectedType === 'Sellers' && styles.selectedButton]}
          onPress={() => handleTypeChange('Sellers')}
        >
          <Text style={styles.headerButtonText}>Sellers</Text>
        </TouchableOpacity>
      </View>
      {transactionHistory.map((listing) => renderTransactionItem(listing))}
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
    color: 'black',
    fontWeight: '600',
    marginRight: 10,
  },
  transactionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 8,
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
  productTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: 'black',
  },
  price: {
    fontSize: 14,
    fontWeight: '500',
    color: '#488C22',
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: 'gray',
  },
});

export default ChattingScreen;
