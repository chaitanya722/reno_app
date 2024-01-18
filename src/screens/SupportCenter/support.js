// SupportCenterScreen.js

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet,TouchableHighlight } from 'react-native';
import Colors from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';
import RoutePaths from '../../Navigations/RoutePaths';

const SupportCenterScreen = () => {
  const [contactInfo, setContactInfo] = useState(null);
  const apiKey = '90bd6f5b-033f-42e7-8e92-2a443dfa42f8';
  const navigation = useNavigation();

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const response = await fetch('https://apis.devcorps.in/getContactPage_cms', {
          headers: {
            'api-key': apiKey,
          },
        });

        const result = await response.json();

        if (result.success) {
          setContactInfo(result.data);
        } else {
          console.error('Failed to fetch contact information:', result.message);
        }
      } catch (error) {
        console.error('Error fetching contact information:', error.message);
      }
    };

    fetchContactInfo();
  }, []);

  return (
    <View style={styles.container}>
            <Text style={styles.Title}>Contact Us</Text>

      {contactInfo ? (
        <> 

          <Text style={styles.label}>Email:</Text>
          <Text style={styles.info}>{contactInfo.email}</Text>

          <Text style={styles.label}>Phone:</Text>
          <Text style={styles.info}>{contactInfo.contact_number}</Text>

          {/* <Text style={styles.label}>Telephone:</Text>
          <Text style={styles.info}>{contactInfo.tel}</Text> */}

          <Text style={styles.label}>Address:</Text>
          <Text style={styles.info}>{contactInfo.address}</Text>

          {/* <Text style={styles.label}>Office Address:</Text>
          <Text style={styles.info}>{contactInfo.office_address}</Text> */}
             
        </>
      ) : (
        <Text>Loading...</Text>
      )}
         <View style={{ flexDirection: 'column', alignItems: 'center', marginVertical: 5 }}>
          {/* Render the "Add to Cart" button */}
          {/* <TouchableHighlight
            style={styles.button}
            onPress={() => navigation.navigate(RoutePaths.ChatScreen, )}
            underlayColor={Colors.Green}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
             
              <Text style={{ color: Colors.White ,fontWeight:'600'}}>Write to Us</Text>
            </View>
          </TouchableHighlight> */}
          {/* Render the "Buy Now" button */}
          <TouchableHighlight
            style={styles.button}
            onPress={() => navigation.navigate(RoutePaths.ChatScreen, )}
                        underlayColor={Colors.Green}>
            <Text style={{ color: Colors.White ,fontWeight:'600'}}>Talk to our Agents</Text>
          </TouchableHighlight>
        </View>
        {/* <Text style={styles.Faqs}>FAQs</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
    color:Colors.Black },
    Title: {
        fontSize: 18,
        fontWeight: '600',
        marginTop: 8,
        color:Colors.Gray },
  info: {
    fontSize: 14,
    marginTop: 4,
    color:Colors.Gray
  },
   button: {
    alignItems: 'center',
    backgroundColor: '#488C20',
    padding: 10,
    margin: 10,
    borderRadius: 13,
    alignSelf: 'center',
    textDecorationLine: 'underline',
    width: '100%',
  },
  Faqs:{
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
    color:Colors.Gray },
  
  gap: {
    height: 20,
  },
  
});

export default SupportCenterScreen;
