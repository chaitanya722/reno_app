import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import Colors from '../../../../constants/colors';
import ImagePicker from 'react-native-image-crop-picker';
import { Picker } from '@react-native-picker/picker';
import Modal from 'react-native-modal';
import { useSelector } from 'react-redux';
import RoutePaths from '../../../../Navigations/RoutePaths';


const AddListingScreen = ({ navigation }) => {
  const [listingData, setListingData] = useState({
    mid:'',
    service_name: '',
    service_area: '',
    price: '',
    stock: '',
    category: '',
    thumbnail_photo: null,
    slider_photos: [],
    description: '',
  });
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { user_Info } = useSelector((state) => state.home);
 

  useEffect(() => {
    fetchCategories();
  }, []);

  const apiKey = '90bd6f5b-033f-42e7-8e92-2a443dfa42f8';

  const handlePhotoUpload = () => {
    ImagePicker.openPicker({
      multiple: false,
      mediaType: 'photo',
      compressImageQuality: 0.5,
      compressImageMaxWidth: 500,
      compressImageMaxHeight: 500,
    })
      .then((response) => {
        setListingData({ ...listingData, thumbnail_photo: response.path });
      })
      .catch((error) => {
        console.log('ImagePicker Error: ', error);
      });
  };

  const handleSliderPhotoUpload = () => {
    ImagePicker.openPicker({
      multiple: true,
      mediaType: 'photo',
      compressImageQuality: 0.5,
      compressImageMaxWidth: 500,
      compressImageMaxHeight: 500,
      maxFiles: 3,
    })
      .then((response) => {
        const sliderPhotos = response.map((photo) => photo.path);
        setListingData({ ...listingData, slider_photos: sliderPhotos });
      })
      .catch((error) => {
        console.log('ImagePicker Error: ', error);
      });
  };

  const handleAddListing = async () => {
    setIsLoading(true); 
    try {
      const formData = new FormData();
      formData.append('mid',user_Info?.mid)
      formData.append('service_name', listingData.service_name);
      formData.append('service_area', listingData.service_area);
      formData.append('price', listingData.price);
      formData.append('stock', listingData.stock);
      formData.append('category', listingData.category);
      formData.append('description', listingData.description);
  
      if (listingData.thumbnail_photo) {
        formData.append('thumbnail_photo', {
          uri: listingData.thumbnail_photo,
          type: 'image/jpeg',
          name: 'thumbnail_photo.jpg',
        });
      }
  
      if (listingData.slider_photos && listingData.slider_photos.length > 0) {
        listingData.slider_photos.forEach((photo, index) => {
          formData.append(`slider_photos[${index}]`, {
            uri: photo,
            type: 'image/jpeg',
            name: `slider_photo_${index}.jpg`,
          });
        });
      }
  
      const response = await axios.post(
        'https://apis.devcorps.in/create_listing_profile',
        formData,
        {
          headers: {
            'api-key': apiKey,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
  
      if (response.data.success) {
        setIsModalVisible(true); // Show the modal on successful listing creation
      } else {
        console.error('Failed to add listing:', response.data.message);
        Alert.alert('Error', `Failed to add listing: ${response.data.message}`, [{ text: 'OK' }]);
      }
    } catch (error) {
      console.error('Error adding listing:', error.message);
      Alert.alert('Error', `Error adding listing: ${error.message}`, [{ text: 'OK' }]);
    } finally {
      setIsLoading(false); // Stop loader regardless of success or failure
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://apis.devcorps.in/getAllCategory_mpm', {
        headers: {
          'api-key': apiKey,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setCategories(response.data.data);
      } else {
        console.error('Failed to fetch categories:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching categories:', error.message);
    }
  };
  
  const closeModal = () => {
    setIsModalVisible(false);
    navigation.navigate(RoutePaths.MyListingScreen);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.label}>Service Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Service Name"
          placeholderTextColor={Colors.Gray}
          value={listingData.service_name}
          onChangeText={(text) => setListingData({ ...listingData, service_name: text })}
        />

        <Text style={styles.label}>Service Area</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Service Area"
          placeholderTextColor={Colors.Gray}

          value={listingData.service_area}
          onChangeText={(text) => setListingData({ ...listingData, service_area: text })}
        />

        <Text style={styles.label}>Price</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Price"
          placeholderTextColor={Colors.Gray}
          keyboardType="numeric" // Set numerical keyboard

          value={listingData.price}
          onChangeText={(text) => setListingData({ ...listingData, price: text })}
        />

        <Text style={styles.label}>Quantity</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Quantity"
          keyboardType="numeric" // Set numerical keyboard

          placeholderTextColor={Colors.Gray}

          value={listingData.stock}
          onChangeText={(text) => setListingData({ ...listingData, stock: text })}
        />

        <Text style={styles.label}>Category</Text>
        <Picker
          selectedValue={listingData.category}
          onValueChange={(itemValue) => setListingData({ ...listingData, category: itemValue })}
        >
          <Picker.Item label="Select a Category" value="" color="gray" />

          {categories.map((category) => (
            <Picker.Item key={category.cid} label={category.category_name} value={category.cid} />
          ))}
        </Picker>

        <TouchableOpacity
          onPress={handlePhotoUpload}
          style={{ backgroundColor: '#488C20', padding: 10, borderRadius: 5, marginTop: 16, alignItems: 'center' }}
        >
          <Text style={{ color: Colors.White }}>Upload Service Photo</Text>
        </TouchableOpacity>

        {listingData.thumbnail_photo && (
          <Image source={{ uri: listingData.thumbnail_photo }} style={{ width: 100, height: 100, borderRadius: 8, marginTop: 8 }} />
        )}

        <TouchableOpacity
          onPress={handleSliderPhotoUpload}
          style={{ backgroundColor: '#488C20', padding: 10, borderRadius: 5, marginTop: 16, alignItems: 'center' }}
        >
          <Text style={{ color: Colors.White }}>Upload Slider Photos (Max 3)</Text>
        </TouchableOpacity>

        {listingData.slider_photos && listingData.slider_photos.length > 0 && (
          <ScrollView horizontal style={{ marginTop: 8 }}>
            {listingData.slider_photos.map((photo, index) => (
              <Image key={index} source={{ uri: photo }} style={{ width: 100, height: 100, borderRadius: 8, marginRight: 8 }} />
            ))}
          </ScrollView>
        )}

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Description"
          placeholderTextColor={Colors.Gray}

          value={listingData.description}
          onChangeText={(text) => setListingData({ ...listingData, description: text })}
        />

<TouchableOpacity
          onPress={handleAddListing}
          style={{ backgroundColor: '#3c9429', borderRadius: 5, paddingVertical: 10, paddingHorizontal: 15, alignItems: 'center', marginTop: 16 }}
        >
          <Text style={{ color: Colors.White }}>Submit</Text>
        </TouchableOpacity>

        {isLoading && (
          // Loader component
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color={Colors.Green} />
          </View>
        )}

        {/* Success Modal */}
        <Modal visible={isModalVisible} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Listing Created Successfully</Text>
            <TouchableOpacity onPress={ closeModal} style={styles.okButton}>
              <Text style={{ color: Colors.White }}>OK</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    color: Colors.Gray,
  },
  
  label: {
    color: Colors.Black,
    marginBottom: 4,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
   modalContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: Colors.Black,
  },
  okButton: {
    backgroundColor: '#3c9429',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  okButtonText: {
    color: Colors.White,
  },
});;

export default AddListingScreen;
