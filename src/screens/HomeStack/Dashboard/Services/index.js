import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ScrollView, Image } from 'react-native';
import CommonHomeList from '../../../../components/CommonHomeList';
import TopCard from '../../../../components/TopCard';
import HomeServiceCard from '../../../../components/HomeServiceCard';
import RoutePaths from '../../../../Navigations/RoutePaths';
import { useSelector } from 'react-redux';
import Colors from '../../../../constants/colors';
const Services = ({ navigation }) => {
  const [selectedItemCategory, setSelectedItemCategory] = useState('Product');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [productCategories, setProductCategories] = useState([]);
  const [serviceCategories, setServiceCategories] = useState([]);
  const [selectedCategoryProducts, setSelectedCategoryProducts] = useState([]);

  const { isLoading, marketPlaceList, homeServiceList, showCaseList } =
    useSelector((state) => state.home);

  useEffect(() => {
    if (selectedItemCategory === 'Product') {
      fetchProductCategories();
    } else if (selectedItemCategory === 'Service') {
      fetchServiceCategories();
    } else {
      setProductCategories([]);
      setServiceCategories([]);
    }
  }, [selectedItemCategory]);

  useEffect(() => {
    if (selectedItemCategory && selectedCategory) {
      const categoryNameField =
        selectedItemCategory === 'Product' ? 'product_category' : 'service_category';
      const categoryId = selectedCategory.pcid; // Replace 'pcid' with the correct field for product category
      const serviceCategoryId = selectedCategory.scid; // Use the correct field for service category
      // Fetch products only if a specific category is selected
      if (selectedCategory.category_name !== 'All') {
        fetchProductsForCategory(
          categoryNameField,
          selectedItemCategory === 'Product' ? categoryId : serviceCategoryId
        );
      }
    }
  }, [selectedItemCategory, selectedCategory]);

  useEffect(() => {
    // Fetch all products when 'All' category is selected
    if (selectedItemCategory && selectedCategory && selectedCategory.category_name === 'All') {
      fetchProductsForCategory(
        selectedItemCategory === 'Product' ? 'product_category' : 'service_category',
        ''
      );
    }
  }, [selectedCategory]);

  const fetchProductCategories = async () => {
    try {
      const response = await fetch('https://apis.devcorps.in/getAllProductCategories_hsm', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'api-key': '90bd6f5b-033f-42e7-8e92-2a443dfa42f8',
        },
      });

      const result = await response.json();
      if (result.success) {
        setProductCategories(result.data || []);
      } else {
        console.error('Failed to fetch product categories');
      }
    } catch (error) {
      console.error('Error fetching product categories:', error);
    }
  };

  const fetchServiceCategories = async () => {
    try {
      const response = await fetch('https://apis.devcorps.in/getAllServiceCategories_hsm', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'api-key': '90bd6f5b-033f-42e7-8e92-2a443dfa42f8',
        },
      });

      const result = await response.json();
      if (result.success) {
        setServiceCategories(result.data || []);
      } else {
        console.error('Failed to fetch service categories');
      }
    } catch (error) {
      console.error('Error fetching service categories:', error);
    }
  };

  const fetchProductsForCategory = (categoryNameField, categoryId) => {
    const productsForCategory = homeServiceList.filter(
      (product) => !categoryId || product[categoryNameField] === categoryId
    );
    setSelectedCategoryProducts(productsForCategory);
  };

  const _handleItemCategoryClick = (itemCategory) => {
    setSelectedItemCategory(itemCategory);
    setSelectedCategory({ category_name: 'All' }); // Select 'All' by default
  };

  const _handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const getCategoryNameById = (categoryId, categoryNameField) => {
    const categories = selectedItemCategory === 'Product' ? productCategories : serviceCategories;
    const category = categories.find((cat) => cat.pcid === categoryId);
    return category ? category[categoryNameField] : '';
  };

  const getCategoryData = () => {
    return selectedItemCategory === 'Product' ? productCategories : serviceCategories;
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <CommonHomeList
          isHorizontal={true}
          data={['Service Category', 'Product Category']}
        
          renderItem={(item, index) => {
            // Add your rendering logic for the horizontal list items here if needed
          }}
        />

        <View style={styles.categoryContainer}>
          
          <TouchableOpacity
            style={[
              styles.categoryButton,
              selectedItemCategory === 'Product' && styles.selectedItemCategory,
            ]}
            onPress={() => _handleItemCategoryClick('Product')}
          >
            <Text style={[styles.itemcategoryText, ]}>
              Product Category
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.categoryButton,
              selectedItemCategory === 'Service' && styles.selectedItemCategory,
            ]}
            onPress={() => _handleItemCategoryClick('Service')}
          >
            <Text style={[styles.itemcategoryText]}>
              Service Category
            </Text>
          </TouchableOpacity>
        </View>

        {selectedItemCategory && (
          <ScrollView horizontal={true}>
            {[{ category_name: 'All', photos: ['http://139.59.236.50/Renoadmin/footer_images/a381d0ad93064104a526b8138c75fbdd.png'] }, ...getCategoryData()].map((category) => (
              <TouchableOpacity
                key={category.category_name}
                style={[
                  styles.categoryCard,
                  selectedCategory.category_name === category.category_name && styles.selectedCategory,
                ]}
                onPress={() => _handleCategoryClick(category)}
              >
                {selectedCategory.category_name === category.category_name && (
                  <View style={styles.circularOutline}>
                    <Image source={{ uri: category.photos[0] }} style={styles.categoryImage} />
                  </View>
                )}
                {selectedCategory.category_name !== category.category_name && (
                  <Image source={{ uri: category.photos[0] }} style={styles.categoryImage} />
                )}
                <Text style={styles.categoryName}>{category.category_name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
                  <View style={styles.gap} />

          <View style={styles.divider} />
        {selectedItemCategory && selectedCategory && selectedCategoryProducts.length > 0 && (
          <ScrollView horizontal={true}>
            <View style={styles.productListContainer}>
              <CommonHomeList
                isHorizontal={false}
                data={selectedCategoryProducts}
                headerTitle={`Products in ${getCategoryNameById(
                  selectedCategory.category_id,
                  selectedItemCategory === 'Product' ? 'product_category' : 'service_category'
                )} Category`}
                renderItem={(item, index) => (
                  <HomeServiceCard data={item.item} />
                )}
              />
            </View>
          </ScrollView>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
   padding:8
  },

  circularOutline: {
    borderWidth: 2,
    borderRadius: 40, 
    borderColor: '#8FC743', 
    padding: 2, 
  },
  divider: {
    height: 1,
    backgroundColor: 'CFCFCF',
    marginEnd:10,
    marginStart:10

  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 36,
    marginTop: 12,
    marginBottom: 12,
  },

  itemcategoryText: {
    color: '#000',
  },
  selectedItemCategory: {
    borderBottomWidth: 2,
    borderBottomColor: '#8FC743',
  },
  selectedCategory: {
    borderBottomColor: '#8FC743',
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
    fontSize: 12,
    color: 'black',
  },
  productListContainer: {
    marginTop: 16,
   
  },
  gap:{
    height:10
  }
});

export default Services;