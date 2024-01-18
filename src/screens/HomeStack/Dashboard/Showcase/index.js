import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import ProjectShowCaseCard from '../../../../components/ProjectShowCaseCard';
import RoutePaths from '../../../../Navigations/RoutePaths';
import Colors from '../../../../constants/colors';

const Showcase = ({ navigation }) => {
  const { isLoading, marketPlaceList, homeServiceList, showCaseList } =
    useSelector((state) => state.home);

  const [categories, setCategories] = useState([]);
  const [projects, setProjects] = useState([]);

  const _handleButtonClick = (item, routePath) => {
    navigation.navigate(routePath, { item: item });
  };
  const handleViewMoreClick = () => {
    console.log('View More Clicked');
    navigation.navigate(RoutePaths.categoryPage, {
      categories,
      onClose: () => setShowCategoryPage(false),
    });
  };
 
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://apis.devcorps.in/getAllCategories_sm', {
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

    const fetchAllProjects = async () => {
      try {
        const response = await fetch('https://apis.devcorps.in//getAllProjects_sm', {
          headers: {
            'api-key': '90bd6f5b-033f-42e7-8e92-2a443dfa42f8',
          },
        });

        const result = await response.json();
        if (result.success) {
          setProjects(result.projects || []);
        } else {
          console.error('Failed to fetch projects');
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchCategories();
    fetchAllProjects();
  }, []);

  const renderCategoryRow = () => {
    return categories.map((category, index) => (
      <View key={index} style={styles.categoryContainer}>
        <View style={styles.categoryInfoContainer}>
          <Text style={styles.category}>{category.ctg_name}</Text>

        <TouchableOpacity style={styles.viewMoreButton} onPress={handleViewMoreClick}>
          <Text style={styles.viewMoreButtonText}>View More</Text>
        </TouchableOpacity>
                </View>

        <FlatList
                
          data={projects.filter((project) => project.category === category.cid)}
          keyExtractor={(item) => item.pid}
          renderItem={({ item }) => (
            <ProjectShowCaseCard
              data={item}
              onPress={() => _handleButtonClick(item, RoutePaths.ShowCaseDetails)}
            />
          )}
        />
      </View>
    ));
  };

  const _handleViewMore = (category) => {
    // Handle View More button click
    // You can navigate to a new screen or handle it as per your requirement
  };

  return (
    <ScrollView style={styles.container}>
      {renderCategoryRow()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 14,
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Align items with space between
    
  },
  category: {
    color: Colors.Black,
    fontSize: 14,
    fontWeight: '600',
    marginTop: 5,
    marginRight: 10,
  },

  viewMoreButtonText: {
    color: '#488C22',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default Showcase;
