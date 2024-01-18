import { StyleSheet, Text, View, ImageBackground, ScrollView, Image,TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import CommonHomeList from '../../../../components/CommonHomeList';
import HomeServiceCard from '../../../../components/HomeServiceCard';
import RoutePaths from '../../../../Navigations/RoutePaths';
import TopCard from '../../../../components/TopCard';
import MarketPlaceCard from '../../../../components/MarketPlaceCard';
import Colors from '../../../../constants/colors';


const MarketPlace = ({ navigation }) => {
  const { isLoading, marketPlaceList, homeServiceList, showCaseList } =
    useSelector(state => state.home);
  
  const [categoryData, setCategoryData] = useState([]);
 const  get_member_info =useState([]);
  useEffect(() => {
    // Fetch category data
    fetchCategoryData();
  }, []);

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
        setCategoryData(result.data || []);
      } else {
        console.error('Failed to fetch category data');
      }
    } catch (error) {
      console.error('Error fetching category data:', error);
    }
  };

  const _handleButtonClick = (item, routePath) => {
    console.log(item);
    console.log(routePath);
    navigation.navigate(routePath, { item: item });
  };

  return (
    <ScrollView>
    <View style={styles.container}>
    
   <ScrollView horizontal={true}>
        {categoryData.map(category => (
          <View key={category.cid} style={styles.categoryCard}>
            <Image
              source={{ uri: category.category_icon }}
              style={styles.categoryImage}
            />
            <Text style={styles.categoryName}>{category.category_name}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.gap} />
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5, justifyContent: 'space-between' }}>
      <Text style={[styles.txt, ]}>
      Trending Now
            </Text>
          
            <TouchableOpacity
          style={styles.txt1}
          onPress={() => navigation.navigate(RoutePaths.CategoriesPage)}
          >
          <Text style={styles.txt1}>    View More</Text>
        </TouchableOpacity>
      
      </View>
      <ScrollView horizontal={true}>
        <CommonHomeList
          isHorizontal={true}
          data={marketPlaceList}
          // headerTitle={'Trending Now'}
          renderItem={(item, index) => {
            return (
              <MarketPlaceCard
                data={item.item}
                onPress={() =>
                  _handleButtonClick(item.item, RoutePaths.MarketPlaceDetails)
                }
              />
            );
          }}
        />   
      </ScrollView>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5, justifyContent: 'space-between' }}>
      <Text style={[styles.txt, ]}>
      Best Selling Product
                  </Text>
            <Text style={[styles.txt1, ]}>
            View More
            </Text>
      
      </View>
      <ScrollView horizontal={true}>
        <CommonHomeList
          isHorizontal={true}
          data={marketPlaceList}
          renderItem={(item, index) => {
            return (
              <MarketPlaceCard
                data={item.item}
                onPress={() =>
                  _handleButtonClick(item.item, RoutePaths.MarketPlaceDetails)
                }
              />
            );
          }}
        />   
      </ScrollView>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5, justifyContent: 'space-between' }}>
      <Text style={[styles.txt, ]}>
      Recommended For you
            </Text>
            <Text style={[styles.txt1, ]}>
            View More
            </Text>
      
      </View>
      <ScrollView horizontal={true}>
        <CommonHomeList
          isHorizontal={true}
          data={marketPlaceList}
          renderItem={(item, index) => {
            return (
              <MarketPlaceCard
                data={item.item}
                onPress={() =>
                  _handleButtonClick(item.item, RoutePaths.MarketPlaceDetails)
                }
              />
            );
          }}
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
  categoriesText: {
    color: Colors.Black,
    fontSize: 16,

    marginLeft: 16,
  },
  txt: {
    fontSize: 16,
    fontWeight: '400',
    color: Colors.Black,

  },
  txt1: {
    fontSize: 16,
    fontWeight: '400',
    color: '#488C20',

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
   
  },
  categoryName: {
    fontSize: 14,
    color: 'black',
  },
 gap:{
  height:10
 }
});

export default MarketPlace;
