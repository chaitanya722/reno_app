import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { BASE_URL } from '../../../../services/environment';

const MyListingsScreen = () => {
  const [listingProfiles, setListingProfiles] = useState([]);
  const apiKey = '90bd6f5b-033f-42e7-8e92-2a443dfa42f8';
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const fetchListingProfiles = async () => {
    try {
      const mid = 'ac64d2d7eb9d40819bc72a420d8cb412';
      const response = await fetch(`${BASE_URL}get_user_listing_profiles?mid=${mid}`, {
        headers: {
          'api-key': apiKey,
        },
      });
      const result = await response.json();

      if (result.success) {
        setListingProfiles(result.listing_profiles);
      } else {
        console.error('Failed to fetch listing profiles:', result.message);
      }
    } catch (error) {
      console.error('Error fetching listing profiles:', error.message);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchListingProfiles(); 
    }
  }, [isFocused]);

  const deleteListing = async (lid) => {
    try {
      const response = await fetch(`http://139.59.236.50:5550/deleteListing_mpm?lid=${lid}`, {
        method: 'DELETE',
        headers: {
          'api-key': apiKey,
        },
      });

      const result = await response.json();

      if (result.success) {
        // Update the state to reflect the deletion
        setListingProfiles((prevProfiles) => prevProfiles.filter((listing) => listing.lid !== lid));
      } else {
        console.error('Failed to delete listing:', result.message);
      }
    } catch (error) {
      console.error('Error deleting listing:', error.message);
    }
  };

  const editListing = (lid) => {
    // Navigate to the edit listing screen with the listing ID
    navigation.navigate('EditListing', { lid });
  };

  const renderListing = (listing) => (
    <TouchableOpacity
      key={listing.lid}
      style={styles.listingContainer}
      onPress={() => navigation.navigate('MarketPlaceDetails', { item: listing })}
    >
      <View style={styles.editIcon}>
        <TouchableOpacity
          style={[styles.iconCircle, { backgroundColor: 'green' }]}
          onPress={() => editListing(listing.lid)}
        >
          <MaterialIcons name="edit" size={20} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.deleteIcon}>
        <TouchableOpacity
          style={[styles.iconCircle, { backgroundColor: 'red' }]}
          onPress={() => deleteListing(listing.lid)}
        >
          <MaterialIcons name="delete" size={20} color="white" />
        </TouchableOpacity>
      </View>
      <Image source={{ uri: listing.thumbnail_photo }} style={styles.thumbnail} />
      <Text style={styles.title}>{listing.title}</Text>
      <View style={styles.gap}/>
      <View style={styles.row}>
        <Text style={styles.price}>$ {listing.price}</Text>
        <Text style={styles.price}>Qty: {listing.stock}</Text>
      </View>
    </TouchableOpacity>
  );
  
  const renderListingsRow = (listings) => (
    <View style={styles.listingsRow}>
      {listings.map((listing) => renderListing(listing))}
      {listings.length === 1 && <View style={styles.emptyListing}></View>}
    </View>
  );

  const renderListings = () => {
    const rows = [];
    for (let i = 0; i < listingProfiles.length; i += 2) {
      const rowListings = listingProfiles.slice(i, i + 2);
      rows.push(renderListingsRow(rowListings));
    }
    return rows;
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {renderListings()}
      </ScrollView>
      <TouchableOpacity
        style={styles.floatingActionButton}
        onPress={() => navigation.navigate('AddListing')}
      >
        <MaterialIcons name="add" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  row:{

    flexDirection:'row',
  },
  listingsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  listingContainer: {
    flex: 1,
    alignItems: 'center',
    borderWidth: 0.7,
    borderColor: '#878787',
    borderRadius: 8,
    padding: 8,
    margin: 4,
    position: 'relative',
    width: '45%',
    backgroundColor:'#FFFFFF'
  },
  gap:{height:10}, 
  emptyListing: {
    flex: 1,
    margin: 4,
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  thumbnail: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: '#000',
  },
  price: {
  
    fontSize: 14,
    fontWeight: '600',
    color: '#488C22',
   marginRight:30
  },
iconCircle: {
    width: 28,
    height:28,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteIcon: {
    position: 'absolute',
    top: 5,
    left: 5,
    zIndex: 1,
  },
  editIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
    zIndex: 1,
  },
  floatingActionButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: '#488C22',
    borderRadius: 36,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  emptyListingText: {
  color: 'transparent',
},
});

export default MyListingsScreen;
