import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import axios from 'axios';
import Colors from '../constants/colors';
import {useDispatch, useSelector} from 'react-redux';

 
const BookingPage = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [bookings, setBookings] = useState([]);
  const mid = 'ac64d2d7eb9d40819bc72a420d8cb412';
  
  const { user_Info, } =
    useSelector(state => state.home);

  useEffect(() => {
    // Fetch bookings data when the component mounts
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response1 = await axios.get(
        `https://apis.devcorps.in/getBooking_hsm?mid=${mid}`,
        {
          headers: {
            'api-Key': '90bd6f5b-033f-42e7-8e92-2a443dfa42f8',
          },
        }
      );

      const response2 = await axios.get(
        `https://apis.devcorps.in/getBooking_sm?mid=${mid}`,
        {
          headers: {
            'api-Key': '90bd6f5b-033f-42e7-8e92-2a443dfa42f8',
          },
        }
      );

      if (response1.data.success && response2.data.success) {
        // Combine bookings from both API responses
        const combinedBookings = [...response1.data.bookings_data, ...response2.data.bookings_data];
        setBookings(combinedBookings);
      } else {
        console.error('Failed to fetch bookings:', response1.data.message || response2.data.message);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error.message);
    }
  };
  const getBookingTypeIndicator = (bookingType) => {
    // Return the appropriate indicator based on booking type
    return bookingType === 'sm' ? 'Showcase' : 'Homeservice';
  };

  const handleDatePress = (day) => {
    // Handle the selected date
    setSelectedDate(day.dateString);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Select a date for booking:</Text>
      <Calendar
        onDayPress={handleDatePress}
        markedDates={bookings.reduce((markedDates, booking) => {
          markedDates[booking.date] = { selected: true, marked: true, selectedColor: 'red' };
          return markedDates;
        }, {})}
      />

      {selectedDate !== '' && (
        <ScrollView>
          <Text style={styles.subHeader}>Your Bookings for {selectedDate}:</Text>
          {bookings
            .filter((booking) => booking.date === selectedDate)
            .map((booking) => (
              <View key={booking.bid} style={styles.bookingItem}>
                <View style={styles.bookingTypeIndicator}>
                  <Text style={styles.bookingTypeText}>
                    {getBookingTypeIndicator(booking)}
                  </Text>
                </View>
                  
                <Text style={styles.bookingTitle}>{booking.title}</Text>
                <Text style={styles.bookingVenue}> {booking.venue}</Text>
                <Text style={styles.constext}> {booking.consultant}</Text>
                <View style={styles.bookingDetails}>
                <Text style={styles.bookingStatus}>Status: {booking.status}</Text>
                <Text style={styles.bookingStatus}> {booking.time}</Text>

                </View>
                </View>
            ))}
        </ScrollView>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  bookingItem: {
    borderWidth: 1,
    borderColor: Colors.Gray,
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    position: 'relative',
  },
  bookingTypeIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#3c9429',
    borderRadius: 5,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  bookingTypeText: {
    color: Colors.White,
    fontSize: 12,
  },
  consultantCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  
  bookingDetails: {
    flexDirection: 'row',
    alignItems:'center',
  
  },
  bookingTime: {
    color: Colors.Black,
    fontSize: 14,
    marginTop: 8,
    marginRight: 50,
  },
  bookingTitle: {
    color: Colors.Black,
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
  },
  bookingItem: {
    borderWidth: 1,
    borderColor: Colors.Gray,
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    backgroundColor:'#FFFFFF'
  },
  bookingTitle: {
    color: Colors.Black,
    fontSize: 16,
    fontWeight: 'bold',
  },
  bookingVenue: {
    color: Colors.Black,
    fontSize: 14,
    marginTop: 8,
  },
  constext: {
    color: '#488C20',
    fontSize: 14,
    marginTop: 8,
    fontWeight:'600'
  },
  bookingTime: {
    color: Colors.Black,
    fontSize: 14,
    marginTop: 8,
  },
  bookingStatus: {
    color: Colors.Black,
    fontSize: 14,
    marginTop: 8,
    marginRight:30
  },
  
});

export default BookingPage;
