import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { BASE_URL } from '../services/environment';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Badge } from '@ant-design/react-native';
import Colors from '../constants/colors';

const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const mid = 'ac64d2d7eb9d40819bc72a420d8cb412';
      const response = await axios.get(
        `${BASE_URL}getNotes_crm?mid=${mid}`,
        {
          headers: {
            'api-key': '90bd6f5b-033f-42e7-8e92-2a443dfa42f8',
          },
        }
      );

      if (response.data.success) {
        const updatedNotifications = response.data.data.messages.map((msg) => {
          if (!msg.readed) {
            updateReadStatus(mid, msg.msg_id);
          }

          return {
            ...msg,
            backgroundColor: msg.readed ? 'transparent' : 'rgba(0, 255, 0, 0.2)',
          };
        });

        setNotifications(updatedNotifications);

        const unreadCount = response.data.data.messages.reduce((count, msg) => {
          return count + (msg.readed ? 0 : 1);
        }, 0);

        setUnreadCount(unreadCount);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error.message);
    }
  };

  const updateReadStatus = async (mid, msgId) => {
    try {
      const formData = new FormData();
      formData.append('mid', mid);

      await axios.put(
        `${BASE_URL}updateReadStatus_crm`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'api-key': '90bd6f5b-033f-42e7-8e92-2a443dfa42f8',
          },
          params: {
            msg_id: msgId,
          },
        }
      );
    } catch (error) {
      console.error('Error updating read status:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.msg_id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{ ...styles.notificationContainer, backgroundColor: item.backgroundColor }}
          >
            <Text style={styles.notificationText}>{item.msg}</Text>
            <Text style={styles.notificationInfo}>
              {item.date}   {item.time}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  notificationContainer: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
  },
  notificationText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#000',
  },
  notificationInfo: {
    fontSize: 12,
    color: '#888',
  },
});

export default NotificationsScreen;
