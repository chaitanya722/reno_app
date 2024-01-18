import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native';
import ProjectShowCaseCard from './ProjectShowCaseCard';

const CategoryPage = ({ navigation, route }) => {
  const { categories = [] } = route.params;
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Text onPress={() => navigation.goBack()}>Close</Text>
      ),
    });
    // Fetch projects for 'All' category
    handleCategoryPress('All');
  }, [navigation]);

  const handleCategoryPress = async (categoryId) => {
    let projectsForCategory = [];
    if (categoryId === 'All') {
      // Fetch all projects for 'All' category
      try {
        const response = await fetch('http://139.59.236.50:5550/getAllProjects_sm', {
          method: 'GET',
          headers: {
            'api-key': '90bd6f5b-033f-42e7-8e92-2a443dfa42f8',
          },
        });
        const result = await response.json();
        if (result.success) {
          projectsForCategory = result.projects;
        } else {
          console.error('Failed to fetch projects');
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    } else {
      // Fetch projects for the selected category
      try {
        const response = await fetch('http://139.59.236.50:5550/getAllProjects_sm', {
          method: 'GET',
          headers: {
            'api-key': '90bd6f5b-033f-42e7-8e92-2a443dfa42f8',
          },
        });
        const result = await response.json();
        if (result.success) {
          projectsForCategory = result.projects.filter(project => project.category === categoryId);
        } else {
          console.error('Failed to fetch projects');
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    }

    setProjects(projectsForCategory);
    setSelectedCategory(categoryId);
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        {[{ cid: 'All', ctg_name: 'All', ctg_photo: 'http://139.59.236.50/Renoadmin/footer_images/a381d0ad93064104a526b8138c75fbdd.png' }, ...categories].map((category) => (
          <TouchableOpacity
            key={category.cid}
            style={[styles.card, selectedCategory === category.cid && styles.selectedCard]}
            onPress={() => handleCategoryPress(category.cid)}
          >
            <Image source={{ uri: category.ctg_photo }} style={[styles.image, selectedCategory === category.cid && styles.selectedImage]} />
            <Text style={styles.categoryName}>{category.ctg_name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {selectedCategory && (
        <ScrollView style={styles.projectsContainer} showsVerticalScrollIndicator={false}>
          {projects.map((project) => (
            <ProjectShowCaseCard key={project.pid} data={project} onPress={() => console.log('Project pressed')} />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  card: {
    alignItems: 'center',
    marginHorizontal: 5,
  },
 
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  selectedImage: {
    borderColor: '#8FC743',
    borderWidth: 2,
    borderRadius: 28, // Adjusted to accommodate the border
  },
  categoryName: {
    marginTop: 5,
    color: '#000',
  },
  projectsContainer: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
});

export default CategoryPage;
