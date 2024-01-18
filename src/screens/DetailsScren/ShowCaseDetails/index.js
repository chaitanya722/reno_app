import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableHighlight, Image } from 'react-native';
import Colors from '../../../constants/colors';
import ProjectShowCaseSlider from '../../../components/projectShowCaseSlider';
import { vh } from '../../../util/dimenstions';
import RoutePaths from '../../../Navigations/RoutePaths';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { useSelector } from 'react-redux';


const ShowCaseDetails = ({ route }) => {
  const navigation = useNavigation();
  const { item } = route.params;
  const [likes, setLikes] = useState(item?.likes || 0);
  const [isLiked, setIsLiked] = useState(false);
  const { user_Info } = useSelector(state => state.home);

  useEffect(() => {
    const checkLikedStatus = async () => {
      try {
        const apiKey = '90bd6f5b-033f-42e7-8e92-2a443dfa42f8';
        const mid = user_Info?.mid

        const response = await axios.get(
          `http://139.59.236.50:8080/api/liked-products?mid=${mid}`,
          {
            headers: {
              'api-key': apiKey,
            },
          }
        );

        const likedItems = response.data?.likedItems;
        if (likedItems && likedItems.spid && likedItems.spid.includes(item?.pid)) {
          setIsLiked(true);
        }
      } catch (error) {
        console.error('Error checking liked status:', error.message);
      }
    };

    checkLikedStatus();

    // Update likes count from your data
    setLikes(item?.likes || 0);
  }, [item?.likes, item?.pid]);

  const handleLikeClick = async () => {
    // Toggle the liked state
    setIsLiked(!isLiked);

    // Update likes count based on the action (like or unlike)
    setLikes(isLiked ? likes - 1 : likes + 1);

    // You can also send a request to your server to update the like status
    // and count in your database
    try {
      const apiKey = '90bd6f5b-033f-42e7-8e92-2a443dfa42f8';
      const mid = user_Info?.mid
      const spid = item?.pid;

      const formData = new FormData();
      formData.append('mid', mid);
      formData.append('spid', spid);

      const response = await axios.post(
        'http://139.59.236.50:8080/api/like-spid',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'api-key': apiKey,
          },
        }
      );

      const result = response.data;

      if (!result.success) {
        console.error('Failed to like the project:', result.message);
        // Reset the liked state if the request fails
        setIsLiked(!isLiked);
        // You might want to show an error message to the user
      }
    } catch (error) {
      console.error('Error liking the project:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <ProjectShowCaseSlider isShareShow={true} data={item?.slider_photos} />
        <View style={{ backgroundColor: '#F5F5F5', minHeight: vh(54), padding: 10, flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: Colors.Black, fontSize: 17, fontWeight: '700', flex: 1 }}>{item?.project_name}</Text>
          <TouchableHighlight underlayColor="transparent" onPress={handleLikeClick}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {isLiked ? (
                <Ionicons name="thumbs-up" size={20} color={Colors.Green} />
              ) : (
                <Ionicons name="thumbs-up-outline" size={20} color={Colors.Gray} />
              )}
              <Text style={{ color: isLiked ? Colors.Green : Colors.Gray, marginLeft: 5 }}>{isLiked ? 'Liked' : 'Like'}</Text>
            </View>
          </TouchableHighlight>
        </View>
        <View style={{ backgroundColor: '#F5F5F5', minHeight: vh(54), padding: 10 }}>
          
          <Text style={{ color: '#3BA617', fontSize: 12, fontWeight: '500' }}>
            Starting From : ${item?.project_rate}
          </Text>
        </View>
        <Text style={{ margin: 10, color: Colors.Black, fontSize: 14 }}>{item?.project_desc}</Text>
        <TouchableHighlight
          style={{
            alignItems: 'center',
            backgroundColor: '#488C20',
            padding: 10,
            margin: 10,
            borderRadius: 23,
            alignSelf: 'center',
            textDecorationLine: 'underline',
            width: '100%',
          }}
          onPress={() => navigation.navigate(RoutePaths.BookingSM, { pid: item?.pid })}
          underlayColor={Colors.Green}>
          <Text style={{ color: Colors.White }}>Book Demo</Text>
        </TouchableHighlight>
        <View style={{ backgroundColor: '#F5F5F5', minHeight: vh(54), padding: 10 }}>
          <Text style={{ color: Colors.Black, fontSize: 15, fontWeight: '400' }}>
            {item?.project_subtitle}
          </Text>
          <Text style={{ margin: 10, color: Colors.Gray }}>{item?.project_details}</Text>
        </View>
        <ProjectShowCaseSlider data={item?.sub_slider_photos} />
        <Image
          source={{ uri: item?.quatation_photo }} // You can adjust this based on your data structure
          style={{ width: '100%', height: 500, marginVertical: 10 }}
        />
        <Text style={{ margin: 10, color: Colors.Gray }}>{item?.project_sub_desc}</Text>
      </ScrollView>
    </View>
  );
};

export default ShowCaseDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10, 
  },
  
  inputField: {
    marginBottom: 10,
    borderWidth: 1,
    padding: 10,
    color: Colors.Black,
    borderColor: Colors.Green,
    borderRadius: 5,
    backgroundColor: Colors.White,
  },
  submitButton: {
    backgroundColor: Colors.lightgreen,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  submitButtonText: {
    color: Colors.green,
  },
  dateAndTimeContainer: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Colors.Green,
    backgroundColor: Colors.White,
  },
  dateAndTimeText: {
    color: Colors.Black,
  },
  hintText: {
    color: Colors.Gray,
  },
});
