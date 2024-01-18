import React, { useState, useEffect } from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../constants/colors';
import { vh, vw } from '../util/dimenstions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import RoutePaths from '../Navigations/RoutePaths';

const ProjectShowCaseCard = ({ data, onPress }) => {
  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState([]);

  const [showCategoryPage, setShowCategoryPage] = useState(false);

  useEffect(() => {
    const fetchCategoryName = async () => {
      try {
        const response = await fetch(`${BASE_URL}getCategory_sm?cid=${data?.category}`, {
          headers: {
            'api-key': '90bd6f5b-033f-42e7-8e92-2a443dfa42f8',
          },
        });
        const result = await response.json();
        if (result.success) {
          setCategoryName(result.category_data.ctg_name);
        }
      } catch (error) {
        console.error('Error fetching category name:', error);
      }
    };
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://apis2.devcorps.in/getAllCategories_sm', {
          headers: {
            'api-key': '90bd6f5b-033f-42e7-8e92-2a443dfa42f8',
          },
        });

        const result = await response.json();
        if (result.success) {
          setCategories(result.categories || []);
        } else {
          console.error('Failed to fetch categories');
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategoryName();
    fetchCategories();
  }, [data?.category]);
  const navigation = useNavigation();

  const handleViewMoreClick = () => {
    console.log('View More Clicked');
    navigation.navigate(RoutePaths.categoryPage, {
      categories,
      onClose: () => setShowCategoryPage(false),
    });
  };
 
  return (
    <TouchableOpacity onPress={onPress} style={styles.mainContainer}>
      {/* Container for category name and "View More" button */}
     
      <ImageBackground source={{ uri: data?.thumbnail_photo }} style={styles.img}>
        <View style={styles.overlay}>
          <Text style={styles.title}>{data?.project_name}</Text>
          <Text style={styles.subtitle}>Starting From: ${data?.project_rate}</Text>
        </View>
      </ImageBackground>
      {showCategoryPage && (
        // Use navigation.navigate to open the new CategoryPage
        navigation.navigate(RoutePaths.categoryPage, { categories, onClose: () => setShowCategoryPage(false) })
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%', // Set width to 100% of the screen
    marginBottom: vw(12),
    padding:14,
    height:250
  },
  img: {
    width: '100%', // Set width to 100% of the screen
    height: vh(262),
    borderRadius: 20,
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Black color with 50% transparency
    padding: 10,
    height: 45,
  },
  
  title: {
    color: Colors.White,
    fontSize: 14,
    fontStyle:'Semibold'
  },
  subtitle: {
    color: Colors.White,
    fontSize: 8,
    fontWeight: '400',
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Align items with space between
  },
  category: {
    color: Colors.Black,
    fontSize: 14,
    fontWeight: '600',
    marginTop: 5,
    
  },
  viewMoreButtonText: {
    color: '#488C22',
    fontSize: 14,
    fontWeight: '500',
  },
  gap: {
    height: 10, 
  },
});

export default ProjectShowCaseCard;
