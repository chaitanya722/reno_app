
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../constants/colors';
import { useSelector } from 'react-redux';


const ReviewPopup = ({ visible, onClose, onSubmit }) => {
  const { user_Info } = useSelector(state => state.home);

  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [username, setUsername] = useState('');

  const handleStarPress = (selectedRating) => {
    setRating(selectedRating);
  };

  const submitReview = async () => {
    // Check if all required fields are filled
    if ( !reviewText || !rating) {
      console.warn('Please fill in all fields');
      return;
    }

    const formData = new FormData();
    formData.append('product_name', 'your_product_name'); 
    formData.append('username', username);
    formData.append('review', reviewText);
    formData.append('mid', user_Info?.mid); 
    formData.append('pid', 'your_product_id'); // Replace with your actual product ID
    formData.append('review_photo', 'your_review_photo_uri'); // Replace with your actual review photo URI
    formData.append('rating', rating.toString());

    try {
      const response = await fetch('https://apis2.devcorps.in/api/addreview_hsm', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          'api-Key': '90bd6f5b-033f-42e7-8e92-2a443dfa42f8',
        },
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        console.log('Review submitted successfully');
        // Close the modal and reset state
        onClose();
        onSubmit(formData); // You can update the reviews state or fetch reviews again
      } else {
        console.error('Failed to submit review:', result.message || 'No error message provided');
      }
    } catch (error) {
      console.error('Error submitting review:', error.message);
    }
  };


  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.popupContainer}>
        <View style={styles.popup}>
          <Text style={styles.popupTitle}>Write a Review</Text>
          <TextInput
            style={styles.input}
            placeholder="Write your review..."
            multiline
            value={reviewText}
            onChangeText={setReviewText}
          />

          <View style={styles.ratingContainer}>
            {[1, 2, 3, 4, 5].map((index) => (
              <TouchableOpacity key={index}   onPress={() => setRating(index)}
              >
                <MaterialCommunityIcons
                  name={rating >= index ? 'star' : 'star-outline'}
                  size={30}
                  color={rating >= index ? '#FFD700' : '#D3D3D3'}
                />
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={submitReview}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  popupContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popup: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  popupTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color:Colors.Black

  },
  input: {
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    height: 80,
    color:Colors.Black
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: '#488C20',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ReviewPopup;
