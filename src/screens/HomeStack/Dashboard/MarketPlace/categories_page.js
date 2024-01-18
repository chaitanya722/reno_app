import { StyleSheet, Text, View, Image, ScrollView ,TouchableOpacity} from 'react-native';
import React, { useState, useEffect } from 'react';
import Colors from '../../../../constants/colors';
import { useSelector } from 'react-redux';
import MarketPlaceCard from '../../../../components/MarketPlaceCard';

import CommonHomeList from '../../../../components/CommonHomeList';
import CommonHomeList2 from '../../../../components/commonHomeList2';
import MarketPlaceCard2 from '../../../../components/MarketPlaceCard2';


const CategoryMpm = ({ navigation }) => {
  const { isLoading, marketPlaceList, homeServiceList, showCaseList } =
    useSelector(state => state.home);

  const [categoryData, setCategoryData] = useState([
    {
      cid: 'all',
      category_name: 'All',
      category_icon: 'http://139.59.236.50/Renoadmin/footer_images/a381d0ad93064104a526b8138c75fbdd.png',
    },
  ]);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [listings, setListings] = useState([]);

  useEffect(() => {
    // Fetch category data
    fetchCategoryData();
  }, []);

  useEffect(() => {
    // Fetch listings based on selected category
    fetchListingsByCategory();
  }, [selectedCategory]);

  const fetchCategoryData = async () => {
    try {
      const response = await fetch('https://apis.devcorps.in/getAllCategory_mpm', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'api-key': '90bd6f5b-033f-42e7-8e92-2a443dfa42f8',
        },
      });

      const result = await response.json();
      if (result.success) {
        setCategoryData([...categoryData, ...(result.data || [])]);
      } else {
        console.error('Failed to fetch category data');
      }
    } catch (error) {
      console.error('Error fetching category data:', error);
    }
  };

  const fetchListingsByCategory = async () => {
    try {
      const response = await fetch('https://apis.devcorps.in/getAllListings_mpm', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'api-key': '90bd6f5b-033f-42e7-8e92-2a443dfa42f8',
        },
      });

      const result = await response.json();
      if (result.success) {
        const filteredListings = selectedCategory === 'all'
          ? result.data
          : result.data.filter(listing => listing.category.toLowerCase() === selectedCategory.toLowerCase());

        setListings(filteredListings || []);
      } else {
        console.error(`Failed to fetch listings for category: ${selectedCategory}`);
      }
    } catch (error) {
      console.error(`Error fetching listings for category: ${selectedCategory}`, error);
    }
  };

  const handleCategoryPress = (category) => {
    setSelectedCategory(category.category_name.toLowerCase());
  };

  const _handleButtonClick = (item, routePath) => {
    console.log(item);
    console.log(routePath);
    navigation.navigate(routePath, { item: item });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Categories */}
        <ScrollView horizontal={true}>
       
{categoryData.map(category => (
  <TouchableOpacity
    key={category.cid}
    style={[
      styles.categoryCard,
      selectedCategory === category.category_name.toLowerCase() && styles.selectedCategoryCard,
    ]}
    onPress={() => handleCategoryPress(category)}
  >
    <View
      style={[
        styles.categoryImageContainer,
        selectedCategory === category.category_name.toLowerCase() && styles.circularOutline,
      ]}
    >
      <Image
        source={{ uri: category.category_icon }}
        style={styles.categoryImage}
      />
    </View>
    <Text style={styles.categoryName}>{category.category_name}</Text>
  </TouchableOpacity>
))}

        </ScrollView>
        <View style={styles.gap} />

        {/* Listings */}
        <ScrollView horizontal={true}>
          <CommonHomeList2
            isHorizontal={true}
            data={listings}
            renderItem={(item, index) => (
              <MarketPlaceCard
                data={item.item}
                onPress={() =>
                  _handleButtonClick(item.item, RoutePaths.MarketPlaceDetails)
                }
              />
            )}
          />
        </ScrollView>
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  txt: {
    fontSize: 16,
    fontWeight: '400',
    color: Colors.Black,
  },
  categoryCard: {
    marginTop: 10,
    marginRight: 8,
    alignItems: 'center',
  },
  categoryImage: {
    width: 60,
    height: 60,
    borderRadius: 40,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    color: 'black',
  },
  gap: {
    height: 10,
  },
  listingCard: {
    marginVertical: 10,
    marginRight: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.Gray,
    padding: 10,
    borderRadius: 8,
  },
 
  categoryImageContainer: {
    width: 68,
    height: 68,
    borderRadius: 40,
    overflow: 'hidden',  
  },
  circularOutline: {
    borderWidth: 2,
    borderRadius: 40, 
    borderColor: '#8FC743', 
    padding: 2, 
  },
});

export default CategoryMpm;
