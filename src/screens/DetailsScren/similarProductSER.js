import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import HomeServiceCard from '../../components/HomeServiceCard';
import Colors from '../../constants/colors';

const SimilarProductsSectionServ = () => {
  const [similarProducts, setSimilarProducts] = useState([]);

  useEffect(() => {
    fetchSimilarProducts();
  }, []);

  const fetchSimilarProducts = async () => {
    try {
      const response = await fetch(
        'https://apis.devcorps.in/getAllProducts_hsm',
        {
          headers: {
            'api-Key': '90bd6f5b-033f-42e7-8e92-2a443dfa42f8',
          },
        }
      );
      const responseData = await response.json();

      if (responseData.success) {
        const filteredProducts = responseData.products.filter(
          (product) => product.item_category === 'servcat'
        );
        setSimilarProducts(filteredProducts);
      } else {
        console.error('Failed to fetch similar products:', responseData.message);
      }
    } catch (error) {
      console.error('Error fetching similar products:', error.message);
    }
  };

  return (
    <View style={styles.similarProductsContainer}>
      <Text style={styles.sectionTitle}>Similar Products</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {similarProducts.map((product) => (
          <HomeServiceCard key={product.pid} data={product} onPress={() => {}} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  similarProductsContainer: {
    padding: 10,
    backgroundColor: Colors.White,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Colors.Black,
  },
});

export default SimilarProductsSectionServ;
